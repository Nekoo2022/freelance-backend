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
export class UpdateGigInput {
  @Field(() => String, { description: 'Gig title', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @IsOptional()
  title?: string;

  @Field(() => String, { description: 'Gig description', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(100)
  @MaxLength(1000)
  @IsOptional()
  description?: string;

  @Field(() => String, { description: 'Gig description', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(100)
  @MaxLength(1000)
  @IsOptional()
  requirements?: string;

  @Field(() => String, { description: 'Gig price', nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: string;

  @Field(() => Int, { description: 'Delivery time in days', nullable: true })
  @IsNumber()
  @Min(1)
  @IsOptional()
  deliveryTime?: number;

  @Field(() => String, { nullable: true, description: 'Gig image URL' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @Field(() => String, { description: 'Gig Id' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  gigId: string;
}
