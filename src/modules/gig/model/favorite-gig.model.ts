import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { GigModel } from './gig.model.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Функция для ленивой загрузки UserModel
function getUserModel() {
  return require('../../user/model/user.model.js').UserModel;
}

@ObjectType()
export class FavoriteGigModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  // Используем функцию для ленивой загрузки типа, чтобы избежать циклической зависимости
  @Field(() => getUserModel())
  user: any;

  @Field(() => String)
  gigId: string;

  @Field(() => GigModel)
  gig: GigModel;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
