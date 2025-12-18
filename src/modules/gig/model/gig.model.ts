import {
  Field,
  GraphQLISODateTime,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { GigStatus } from '../../../../generated/prisma/client.js';

registerEnumType(GigStatus, { name: 'GigStatus' });

@ObjectType()
export class GigModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  requirements: string;

  @Field(() => Number)
  price: number;

  @Field(() => Number)
  deliveryTime: number;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => String)
  authorId: string;

  @Field(() => String)
  categoryId: string;

  @Field(() => GigStatus)
  status: GigStatus;

  @Field(() => Boolean)
  isFeatured: boolean;

  @Field(() => Number)
  rating: number;

  @Field(() => Number)
  completedOrders: number;

  @Field(() => Number)
  views: number;

  @Field(() => Number)
  favoritesCount: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
