import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../user/model/user.model.js';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => UserModel)
  user: UserModel;
}

