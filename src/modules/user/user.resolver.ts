import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service.js';
import { UserModel } from './model/user.model.js';
import { CreateUserInput } from './inputs/create-user.input.js';
import { UpdateUserInput } from './inputs/update-user.input.js';
import 'reflect-metadata';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UseGuards } from '@nestjs/common';
import { FavoriteGigModel } from '../gig/model/favorite-gig.model.js';
import { PrismaService } from '../../core/prisma/prisma.service.js';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @ResolveField(() => [FavoriteGigModel])
  async favoriteGigs(@Parent() user: UserModel) {
    return this.prisma.favoriteGig.findMany({
      where: { userId: user.id },
    });
  }

  @Query(() => [UserModel], { name: 'GetUsers' })
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserModel, { name: 'FindMyProfile' })
  async findMyProfile(@CurrentUser() user: UserModel) {
    return this.userService.findMyProfile(user.id);
  }

  @Mutation(() => Boolean, { name: 'CreateUser' })
  async createUser(
    @Args('data', { type: () => CreateUserInput }) input: CreateUserInput,
  ) {
    return this.userService.createUser(input);
  }

  @Query(() => UserModel, { name: 'FindUserByGigId' })
  async findUserByGigId(@Args('gigId', { type: () => String }) gigId: string) {
    return this.userService.findUserByGigId(gigId);
  }
}
