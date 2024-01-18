import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AccessToken, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(authDto: AuthDto): Promise<Tokens> {
    const hashedPassword = await this.hashData(authDto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        email: authDto.email,
        password: hashedPassword,
      },
    });

    const refresh_token = await this.generateRtToken(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, refresh_token);

    return {
      access_token: await this.generateAtToken(newUser.id, newUser.email),
      refresh_token,
    };
  }

  async signin(authDto: AuthDto): Promise<Tokens> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordValid = bcrypt.compare(authDto.password, user.password);
    if (!isPasswordValid) throw new ForbiddenException('Invalid credentials');

    const refresh_token = await this.generateRtToken(user.id, user.email);
    await this.updateRtHash(user.id, refresh_token);

    return {
      access_token: await this.generateAtToken(user.id, user.email),
      refresh_token,
    };
  }

  async logout(userId: number) {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async refreshTokens(userId: number, rt: string): Promise<AccessToken> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Invalid credentials');

    const isRtValid = await bcrypt.compare(rt, user.refreshToken);
    if (!isRtValid) throw new ForbiddenException('Invalid credentials');

    return {
      access_token: await this.generateAtToken(user.id, user.email),
    };
  }

  private async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private generateAtToken(userId: number, email: string) {
    return this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: process.env.AT_SECRET,
        expiresIn: '15m',
      },
    );
  }

  private generateRtToken(userId: number, email: string) {
    return this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: process.env.RT_SECRET,
        expiresIn: '1w',
      },
    );
  }
}
