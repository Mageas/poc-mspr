import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUserId(userId: number) {
    const sessions = await this.prismaService.session.findUnique({
      where: { userId },
      select: {
        token: true,
      },
    });

    return sessions;
  }

  async findOrCreate(userId: number, refreshToken: string): Promise<void> {
    await this.prismaService.session.upsert({
      where: { userId },
      update: { token: refreshToken },
      create: { userId, token: refreshToken },
    });
  }

  async delete(userId: number) {
    await this.prismaService.session.delete({ where: { userId } });
  }
}
