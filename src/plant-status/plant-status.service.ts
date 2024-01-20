import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlantStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.plantStatus.findMany();
  }

  async isStatusValid(statusId: number) {
    const status = await this.prismaService.plantStatus.findUnique({
      where: { id: statusId },
    });

    if (!status) {
      throw new UnauthorizedException('This plant status does not exist');
    }
  }
}
