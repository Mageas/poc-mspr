import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const usersSelect = {
  id: true,
  email: true,
  roles: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const users = await this.prismaService.user.findMany({
      select: usersSelect,
    });

    return users.map((user) => ({
      ...user,
      roles: user.roles.map((role) => role.name),
    }));
  }

  async findOne(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: usersSelect,
    });

    const roles = user.roles.map((role) => role.name);

    return { ...user, roles };
  }

  async update(paramId: number, userId: number, updateUserDto: UpdateUserDto) {
    await this.isUserOwner(userId, paramId);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.prismaService.user.update({
      where: { id: userId },
      data: updateUserDto,
      select: usersSelect,
    });
  }

  async delete(paramId: number, userId: number) {
    await this.isUserOwner(userId, paramId);

    await this.prismaService.user.delete({ where: { id: userId } });
  }

  async isUserOwner(userId: number, paramId: number): Promise<void> {
    if (userId !== paramId) {
      throw new UnauthorizedException();
    }
  }
}
