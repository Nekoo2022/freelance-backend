import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service.js';
import { CreateCategoryInput } from './inputs/create-category.input.js';
import { CreateCategoryChildrenInput } from './inputs/create-category-child.input.js';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Boolean, { name: 'CreateCategory' })
  async createCategory(@Args('data') input: CreateCategoryInput) {
    return this.categoryService.createCategory(input);
  }

  @Mutation(() => Boolean, { name: 'CreateCategoryChildren' })
  async createCategoryChildren(
    @Args('data') input: CreateCategoryChildrenInput,
  ) {
    return this.categoryService.createCategoryChildren(input);
  }
}
