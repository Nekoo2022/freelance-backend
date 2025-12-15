import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
@ArgsType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  country?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  city?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  locale?: string;

  @Field(() => String)
  userId: string;

  // Пароль обновляется отдельно через специальный input
  // email и username обычно не обновляются через обычный update
}
