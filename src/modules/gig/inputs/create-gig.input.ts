import { Field, InputType, Float, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';

@InputType()
export class CreateGigInput {
  @Field(() => String, { description: 'Gig title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @Field(() => String, { description: 'Gig description' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  description: string;

  @Field(() => Float, { description: 'Gig price' })
  @IsNumber()
  @Min(0)
  price: number;

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
