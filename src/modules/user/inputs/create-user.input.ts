import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String, { description: 'Username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field(() => String, { description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'User password' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
