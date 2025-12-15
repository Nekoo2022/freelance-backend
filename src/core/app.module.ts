import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { RedisModule } from './redis/redis.module.js';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from '../modules/user/user.module.js';
import { GigModule } from '../modules/gig/gig.module.js';
import { AuthModule } from '../modules/auth/auth.module.js';
import { CategoryModule } from '../modules/category/category.module.js';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.graphql'),
      sortSchema: true,
    }),
    UserModule,
    GigModule,
    CategoryModule,
    AuthModule,
  ],
})
export class AppModule {}
