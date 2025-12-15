import { Module } from '@nestjs/common';
import { GigService } from './gig.service.js';
import { GigResolver } from './gig.resolver.js';
import { PrismaModule } from '../../core/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [GigResolver, GigService],
})
export class GigModule {}
