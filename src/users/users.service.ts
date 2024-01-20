import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        roles: true,
      },
    });

    return users.map((user) => ({
      ...user,
      roles: user.roles.map((role) => role.name),
    }));
  }

  async findOne(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        roles: true,
      },
    });

    const roles = user.roles.map((role) => role.name);

    return { ...user, roles };
  }

  async update(paramId: number, userId: number, updateUserDto: UpdateUserDto) {
    if (paramId !== userId) {
      throw new UnauthorizedException();
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.prismaService.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async delete(paramId: number, userId: number) {
    if (paramId !== userId) {
      throw new UnauthorizedException();
    }

    await this.prismaService.user.delete({ where: { id: userId } });
  }
}
