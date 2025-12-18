import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { UserRole, UserStatus } from '../../../../generated/prisma/client.js';
import { GigModel } from '../../../modules/gig/model/gig.model.js';
import { FavoriteGigModel } from '../../gig/model/favorite-gig.model.js';

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(UserStatus, { name: 'UserStatus' });

@ObjectType()
export class UserModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  emailVerified: boolean;

  @Field(() => Boolean)
  phoneVerified: boolean;

  @Field(() => Number)
  failedLoginAttempts: number;

  @Field(() => [GigModel])
  gigs: GigModel[];

  @Field(() => [GigModel])
  hiddenGigs: GigModel[];

  @Field(() => [FavoriteGigModel])
  favoriteGigs: FavoriteGigModel[];

  @Field(() => GraphQLISODateTime, { nullable: true })
  lockUntil?: Date;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => UserStatus)
  status: UserStatus;

  @Field(() => Number)
  balance: number;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  locale?: string;

  @Field(() => Number)
  rating: number;

  @Field(() => Number)
  completedJobs: number;

  @Field(() => Boolean)
  online: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  lastSeenAt?: Date;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
