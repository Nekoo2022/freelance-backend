# Authentication Module

Этот модуль предоставляет систему авторизации через JWT токены с использованием Redis для хранения refresh токенов.

## Основные возможности

- **Регистрация** (`register`) - создание нового пользователя
- **Вход** (`login`) - авторизация с получением access и refresh токенов
- **Обновление токена** (`refreshToken`) - получение новой пары токенов по refresh токену
- **Выход** (`logout`) - удаление refresh токена из Redis

## GraphQL мутации

### Регистрация
```graphql
mutation Register($input: CreateUserInput!) {
  register(input: $input) {
    accessToken
    refreshToken
    user {
      id
      email
      username
    }
  }
}
```

### Вход
```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
    user {
      id
      email
      username
    }
  }
}
```

### Обновление токена
```graphql
mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
    user {
      id
      email
      username
    }
  }
}
```

### Выход
```graphql
mutation Logout {
  logout
}
```

## Использование Guard для защиты запросов

Чтобы защитить GraphQL запросы, используйте `@UseGuards(JwtAuthGuard)`:

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';

@Resolver(() => UserModel)
export class UserResolver {
  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: UserModel) {
    return user;
  }
}
```

## Конфигурация

### Переменные окружения (.env)

```env
# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
```

### Redis

Убедитесь, что Redis сервер запущен:
```bash
redis-server
```

## Безопасность

- Access токены имеют короткий срок жизни (15 минут по умолчанию)
- Refresh токены хранятся в Redis и имеют более длительный срок жизни (7 дней)
- При неудачных попытках входа аккаунт блокируется после 5 попыток на 1 час
- Пароли хешируются с использованием bcrypt (10 раундов)
- Refresh токены удаляются из Redis при выходе

## Структура проекта

```
src/modules/auth/
├── auth.module.ts           # Модуль авторизации
├── auth.service.ts          # Сервис с бизнес-логикой
├── auth.resolver.ts         # GraphQL резолвер
├── guards/
│   └── jwt-auth.guard.ts   # Guard для защиты запросов
├── strategies/
│   └── jwt.strategy.ts     # Passport JWT стратегия
├── decorators/
│   └── current-user.decorator.ts  # Декоратор для получения текущего пользователя
├── inputs/
│   └── login.input.ts      # Input тип для входа
└── model/
    └── auth-response.model.ts  # Модель ответа с токенами
```

