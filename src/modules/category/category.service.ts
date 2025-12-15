import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service.js';
import { CreateCategoryInput } from './inputs/create-category.input.js';
import { CreateCategoryChildrenInput } from './inputs/create-category-child.input.js';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(input: CreateCategoryInput) {
    const { name, slug } = input;

    await this.prisma.category.create({
      data: { name, slug },
    });

    return true;
  }

  async createCategoryChildren(input: CreateCategoryChildrenInput) {
    const { name, slug, categoryId } = input;

    await this.prisma.category.create({
      data: { name, slug, parentId: categoryId },
    });

    return true;
  }
}
