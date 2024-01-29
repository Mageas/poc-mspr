import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto, ReturnAddressDto } from './dto';

export const addressesSelect = {
  id: true,
  street: true,
  city: true,
  zip: true,
};

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

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
      select: addressesSelect,
    });
  }

  async update(
    userId: number,
    id: number,
    createAddressDto: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    await this.isAddressOwner(userId, id);

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
      select: addressesSelect,
    });
  }

  async delete(userId: number, id: number): Promise<void> {
    await this.isAddressOwner(userId, id);

    await this.prismaService.address.delete({ where: { id } });
  }

  async isAddressOwner(userId: number, addressId: number): Promise<void> {
    const address = await this.prismaService.address.findUnique({
      where: { id: addressId },
      select: { userId: true },
    });

    if (!address || address.userId !== userId) {
      throw new UnauthorizedException('This address does not exist');
    }
  }
}
