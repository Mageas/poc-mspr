import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlantSpeciesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.plantSpecies.findMany();
  }
}
