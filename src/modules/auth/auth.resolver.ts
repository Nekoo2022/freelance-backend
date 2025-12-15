import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginInput } from './inputs/login.input.js';
import { CreateUserInput } from '../user/inputs/create-user.input.js';
import { AuthResponse } from './model/auth-response.model.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { UserModel } from '../user/model/user.model.js';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('data', { type: () => LoginInput }) input: LoginInput) {
    return this.authService.login(input);
  }

  @Mutation(() => AuthResponse)
  async register(
    @Args('data', { type: () => CreateUserInput }) input: CreateUserInput,
  ) {
    return this.authService.register(input);
  }

  @Mutation(() => AuthResponse)
  async refreshToken(
    @Args('refreshToken', { type: () => String }) refreshToken: string,
  ) {
    return this.authService.refreshToken(refreshToken);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: UserModel) {
    return this.authService.logout(user.id);
  }
}
