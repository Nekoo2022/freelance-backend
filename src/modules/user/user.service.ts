import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service.js';
import { CreateUserInput } from './inputs/create-user.input.js';
import { UpdateUserInput } from './inputs/update-user.input.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(input: CreateUserInput) {
    const { password, name, username, email } = input;
    await this.prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        username,
      },
    });

    return true;
  }

  async updateUser(userId: string) {
    if (userId) {
      return true;
    }
  }

  async findMyProfile(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: { favoriteGigs: true },
    });

    console.log(user);

    return user;
  }

  async findUserByGigId(gigId: string) {
    const gig = await this.prisma.gig.findUniqueOrThrow({
      where: { id: gigId },
    });

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: gig.authorId },
    });

    return user;
  }
}
