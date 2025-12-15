import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategoryChildrenInput {
  @Field(() => String, { description: 'Category ID' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @Field(() => String, { description: 'Category ID' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Field(() => String, { description: 'Category ID' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
