import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GigService } from './gig.service.js';
import { CreateGigInput } from './inputs/create-gig.input.js';
import { GigModel } from './model/gig.model.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
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
  async findAllGigs() {
    return this.gigService.findAllGigs();
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
}
