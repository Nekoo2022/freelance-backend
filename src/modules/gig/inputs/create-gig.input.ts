import { Field, InputType, Float, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateGigInput {
  @Field(() => String, { description: 'Gig title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  @MaxLength(50)
  title: string;

  @Field(() => String, { description: 'Gig description' })
  @IsString()
  @IsNotEmpty()
  @MinLength(100)
  @MaxLength(1000)
  description: string;

  @Field(() => String, { description: 'Gig requirements' })
  @IsString()
  @IsNotEmpty()
  @MinLength(100)
  @MaxLength(1000)
  requirements: string;

  @Field(() => String, { description: 'Gig price' })
  @IsNumber()
  @Min(0)
  price: string;

  @Field(() => Int, { description: 'Delivery time in days' })
  @IsNumber()
  @Min(1)
  deliveryTime: number;

  @Field(() => String, { nullable: true, description: 'Gig image URL' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @Field(() => String, { description: 'Category ID' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
