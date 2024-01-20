import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AccessToken, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'prisma/role';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private sessionsServices: SessionsService,
  ) {}

  async signup(authDto: AuthDto): Promise<Tokens> {
    const findUser = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });

    if (findUser) throw new ForbiddenException('User already exists');

    const hashedPassword = await this.hashData(authDto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        email: authDto.email,
        password: hashedPassword,
      },
    });

    const newUserRoles = await this.prismaService.role.create({
      data: {
        userId: newUser.id,
        name: Role.Owner,
      },
      select: {
        name: true,
      },
    });

    const userRoles = [newUserRoles.name];

    const refresh_token = await this.generateRtToken(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, refresh_token);

    return {
      access_token: await this.generateAtToken(
        newUser.id,
        newUser.email,
        userRoles,
      ),
      refresh_token,
    };
  }

  async signin(authDto: AuthDto): Promise<Tokens> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(
      authDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new ForbiddenException('Invalid credentials');

    const refresh_token = await this.generateRtToken(user.id, user.email);
    await this.updateRtHash(user.id, refresh_token);

    const userRoles = user.roles.map((role) => role.name);

    return {
      access_token: await this.generateAtToken(user.id, user.email, userRoles),
      refresh_token,
    };
  }

  async logout(userId: number) {
    await this.sessionsServices.delete(userId);
  }

  async refreshTokens(userId: number, rt: string): Promise<AccessToken> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    const session = await this.sessionsServices.findByUserId(userId);

    if (!user || !session.token)
      throw new ForbiddenException('Invalid credentials');

    const isRtValid = await bcrypt.compare(rt, session.token);
    if (!isRtValid) throw new ForbiddenException('Invalid credentials');

    const userRoles = user.roles.map((role) => role.name);

    return {
      access_token: await this.generateAtToken(user.id, user.email, userRoles),
    };
  }

  private async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.sessionsServices.findOrCreate(userId, hash);
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private generateAtToken(userId: number, email: string, roles: string[]) {
    return this.jwtService.signAsync(
      {
        sub: userId,
        email,
        roles,
      },
      {
        secret: process.env.AT_SECRET,
        expiresIn: process.env.AT_EXPIRES_IN ?? '15m',
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
        expiresIn: process.env.RT_EXPIRES_IN ?? '1w',
      },
    );
  }
}
