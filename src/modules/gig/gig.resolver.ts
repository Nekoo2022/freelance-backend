import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GigService } from './gig.service.js';
import { CreateGigInput } from './inputs/create-gig.input.js';
import { GigModel } from './model/gig.model.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { OptionalCurrentUser } from '../auth/decorators/optional-current-user.decorator.js';
import { UserModel } from '../user/model/user.model.js';
import { UpdateGigInput } from './inputs/update-gig.input.js';

@Resolver(() => GigModel)
export class GigResolver {
  constructor(private readonly gigService: GigService) {}

  @Mutation(() => Boolean, { name: 'CreateGig' })
  @UseGuards(JwtAuthGuard)
  async createGig(
    @Args('data', { type: () => CreateGigInput }) input: CreateGigInput,
    @CurrentUser() user: UserModel,
  ) {
    return this.gigService.createGig(input, user.id);
  }

  @Query(() => [GigModel], { name: 'FindAllGigs' })
  @UseGuards(OptionalJwtAuthGuard)
  async findAllGigs(@OptionalCurrentUser() user?: UserModel) {
    return this.gigService.findAllGigs(user?.id);
  }

  @Query(() => [GigModel], { name: 'FindMyGig' })
  @UseGuards(JwtAuthGuard)
  async findMyGigs(@CurrentUser() user: UserModel) {
    return this.gigService.findMyGigs(user.id);
  }

  @Mutation(() => Boolean, { name: 'UpdateGig' })
  @UseGuards(JwtAuthGuard)
  async updateGig(
    @Args('data', { type: () => UpdateGigInput }) input: UpdateGigInput,
    @CurrentUser() user: UserModel,
  ) {
    return this.gigService.updateGig(input, user.id);
  }

  @Query(() => GigModel, { name: 'FindGigById' })
  async findGigById(@Args('gigId', { type: () => String }) gigId: string) {
    return this.gigService.findGigById(gigId);
  }

  @Mutation(() => Boolean, { name: 'DeleteGig' })
  @UseGuards(JwtAuthGuard)
  async deleteGig(
    @Args('gigId', { type: () => String }) gigId: string,
    @CurrentUser() user: UserModel,
  ) {
    return this.gigService.deleteGig(gigId, user.id);
  }

  @Mutation(() => Boolean, { name: 'PublishGig' })
  @UseGuards(JwtAuthGuard)
  async publishGig(
    @Args('gigId', { type: () => String }) gigId: string,
    @CurrentUser() user: UserModel,
  ) {
    return this.gigService.publishGig(gigId, user.id);
  }

  @Mutation(() => Boolean, { name: 'ArchiveGig' })
  @UseGuards(JwtAuthGuard)
  async archiveGig(
    @Args('gigId', { type: () => String }) gigId: string,
    @CurrentUser() user: UserModel,
  ) {
    return this.gigService.archiveGig(gigId, user.id);
  }

  @Mutation(() => Boolean, { name: 'AddToFavorites' })
  @UseGuards(JwtAuthGuard)
  async addToFavorites(
    @Args('gigId', { type: () => String }) gigId: string,
    @CurrentUser() user: UserModel,
  ) {
    return this.gigService.addToFavorites(gigId, user.id);
  }

  @Mutation(() => Boolean, { name: 'RemoveFromFavorites' })
  @UseGuards(JwtAuthGuard)
  async removeFromFavorites(
    @Args('gigId', { type: () => String }) gigId: string,
    @CurrentUser() user: UserModel,
  ) {
    return this.gigService.removeFromFavorites(gigId, user.id);
  }

  @Mutation(() => Boolean, { name: 'HideGig' })
  @UseGuards(JwtAuthGuard)
  async hideGig(
    @Args('gigId', { type: () => String }) gigId: string,
    @CurrentUser() user: UserModel,
  ) {
    return this.gigService.hideGig(gigId, user.id);
  }

  @Query(() => [GigModel], { name: 'FindFavoriteGigs' })
  @UseGuards(JwtAuthGuard)
  async findFavoriteGigs(@CurrentUser() user: UserModel) {
    return this.gigService.findFavoriteGigs(user.id);
  }

  @Query(() => [GigModel], { name: 'FindHiddenGigs' })
  @UseGuards(JwtAuthGuard)
  async findHiddenGigs(@CurrentUser() user: UserModel) {
    return this.gigService.findHiddenGigs(user.id);
  }
}
