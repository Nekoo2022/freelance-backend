import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service.js';
import { UserModel } from './model/user.model.js';
import { CreateUserInput } from './inputs/create-user.input.js';
import { UpdateUserInput } from './inputs/update-user.input.js';
import 'reflect-metadata';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
}
