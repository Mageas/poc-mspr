import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto, ReturnAddressDto } from './dto';

@Injectable()
export class AddressesService {
  constructor(private prismaService: PrismaService) {}

  async create(
    userId: number,
    createAddressDto: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    return await this.prismaService.address.create({
      data: {
        ...createAddressDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        street: true,
        city: true,
        zip: true,
      },
    });
  }

  async update(
    userId: number,
    id: number,
    createAddressDto: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    const existingAddress = await this.prismaService.address.findFirst({
      where: { id },
      select: { userId: true },
    });

    if (!existingAddress || existingAddress.userId !== userId) {
      throw new UnauthorizedException();
    }

    return await this.prismaService.address.update({
      where: { id },
      data: {
        ...createAddressDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        street: true,
        city: true,
        zip: true,
      },
    });
  }

  async delete(userId: number, id: number): Promise<void> {
    const existingAddress = await this.prismaService.address.findFirst({
      where: { id },
      select: { userId: true },
    });

    if (!existingAddress || existingAddress.userId !== userId) {
      throw new UnauthorizedException();
    }

    await this.prismaService.address.delete({ where: { id } });
  }
}
