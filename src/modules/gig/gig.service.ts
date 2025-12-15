import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGigInput } from './inputs/create-gig.input.js';
import { PrismaService } from '../../core/prisma/prisma.service.js';
import { UpdateGigInput } from './inputs/update-gig.input.js';
import { GigStatus, UserRole } from '../../../generated/prisma/client.js';

@Injectable()
export class GigService {
  constructor(private readonly prisma: PrismaService) {}

  async createGig(input: CreateGigInput, authorId: string): Promise<Boolean> {
    const { deliveryTime, description, title, categoryId, imageUrl, price } =
      input;

    await this.prisma.gig.create({
      data: {
        categoryId,
        deliveryTime,
        description,
        title,
        imageUrl,
        price,
        authorId,
      },
    });

    return true;
  }

  async findAllGigs() {
    const gigs = await this.prisma.gig.findMany();

    if (!gigs) throw new BadRequestException('Gigs не найдены');

    return gigs;
  }

  async findMyGigs(authorId: string) {
    const gigs = await this.prisma.gig.findMany({
      where: { authorId },
    });

    if (!gigs) throw new UnauthorizedException('Пользователь не авторизован');

    return gigs;
  }

  async updateGig(input: UpdateGigInput, authorId: string) {
    const { gigId, ...updateData } = input;

    const data = Object.fromEntries(
      Object.entries(updateData).filter((v) => v[1] !== undefined),
    );

    await this.prisma.gig.update({
      where: { id: gigId, authorId },
      data: { ...data },
    });

    return true;
  }

  async findGigById(gigId: string) {
    const gig = await this.prisma.gig.findUniqueOrThrow({
      where: { id: gigId },
    });

    return gig;
  }

  async deleteGig(gigId: string, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    const gig = await this.prisma.gig.findUniqueOrThrow({
      where: { id: gigId },
    });

    if (
      gig.authorId !== userId &&
      user?.role !== UserRole.ADMIN &&
      user?.role !== UserRole.MODERATOR
    ) {
      throw new BadRequestException('Отказано в доступе');
    }

    await this.prisma.gig.delete({ where: { id: gigId } });

    return true;
  }

  async publishGig(gigId: string, authorId: string) {
    await this.prisma.gig.update({
      where: { id: gigId, authorId },
      data: { status: GigStatus.PUBLISHED },
    });

    return true;
  }

  async archiveGig(gigId: string, authorId: string) {
    await this.prisma.gig.update({
      where: { id: gigId, authorId },
      data: { status: GigStatus.ARCHIVED },
    });

    return true;
  }

  // async addToFavorites(gigId: string, userId: string) {
  //   const favorite = await this.prisma.
  // }
}
