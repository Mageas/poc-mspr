import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlantDto, ReturnPlantDto } from './dto';
import { UpdatePlantDto } from './dto/updatePlantDto';
import { AddressesService } from 'src/addresses/addresses.service';
import { PlantStatusService } from 'src/plant-status/plant-status.service';
import { PlantSpeciesService } from 'src/plant-species/plant-species.service';

@Injectable()
export class PlantsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly addressesService: AddressesService,
    private readonly plantStatusService: PlantStatusService,
    private readonly plantSpeciesService: PlantSpeciesService,
  ) {}

  async create(
    userId: number,
    createPlantDto: CreatePlantDto,
  ): Promise<ReturnPlantDto> {
    await this.addressesService.isAddressOwner(
      userId,
      +createPlantDto.addressId,
    );
    await this.plantStatusService.isStatusValid(+createPlantDto.statusId);
    await this.plantSpeciesService.isSpeciesValid(+createPlantDto.speciesId);

    return this.prismaService.plant.create({
      data: {
        name: createPlantDto.name,
        user: { connect: { id: userId } },
        address: { connect: { id: +createPlantDto.addressId } },
        status: { connect: { id: +createPlantDto.statusId } },
        species: { connect: { id: +createPlantDto.speciesId } },
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async update(
    userId: number,
    plantId: number,
    updatePlantDto: UpdatePlantDto,
  ): Promise<ReturnPlantDto> {
    await this.isPlantOwner(userId, plantId);

    if (updatePlantDto.addressId) {
      await this.addressesService.isAddressOwner(
        userId,
        +updatePlantDto.addressId,
      );
    }

    if (updatePlantDto.statusId) {
      await this.plantStatusService.isStatusValid(+updatePlantDto.statusId);
    }

    if (updatePlantDto.speciesId) {
      await this.plantSpeciesService.isSpeciesValid(+updatePlantDto.speciesId);
    }

    return this.prismaService.plant.update({
      where: { id: plantId },
      data: { name: updatePlantDto.name },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async delete(userId: number, plantId: number) {
    await this.isPlantOwner(userId, plantId);

    await this.prismaService.plant.delete({ where: { id: plantId } });
  }

  async isPlantOwner(userId: number, plantId: number): Promise<void> {
    const plant = await this.prismaService.plant.findUnique({
      where: { id: plantId },
      select: { id: true, userId: true },
    });

    if (!plant || plant.userId !== userId) {
      throw new UnauthorizedException('This plant does not exist');
    }
  }
}
