import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlantStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.plantStatus.findMany();
  }
}
