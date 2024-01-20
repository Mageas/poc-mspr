import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlantSpeciesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.plantSpecies.findMany();
  }

  async isSpeciesValid(speciesId: number) {
    const species = await this.prismaService.plantSpecies.findUnique({
      where: { id: speciesId },
    });

    if (!species) {
      throw new UnauthorizedException('This plant species does not exist');
    }
  }
}
