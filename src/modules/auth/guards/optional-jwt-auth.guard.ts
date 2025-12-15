import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  // Переопределяем handleRequest, чтобы не выбрасывать ошибку, если пользователь не авторизован
  handleRequest(err: any, user: any, info: any) {
    // Если есть ошибка или пользователь не найден, просто возвращаем undefined
    // Это позволит запросу продолжиться без авторизации
    if (err || !user) {
      return undefined;
    }
    return user;
  }

  // Переопределяем canActivate, чтобы не выбрасывать ошибку, если токена нет
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Пытаемся выполнить аутентификацию, но если она не удалась, разрешаем запрос
    const result = super.canActivate(context);
    
    if (result instanceof Promise) {
      return result.catch(() => true);
    }
    
    if (result instanceof Observable) {
      return result.pipe(
        map(() => true),
        catchError(() => of(true)),
      );
    }
    
    return result;
  }
}

