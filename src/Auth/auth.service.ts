import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private Jwt: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credential not correct');
    const hash = await argon2.verify(user.hash, dto.password);

    if (!hash) throw new ForbiddenException('Credential not correct');

    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDto) {
    const hash = await argon2.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credetions taken');
        }
      }

      throw error;
    }
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.Jwt.signAsync(payload, {
      expiresIn: '15min',
      secret: secret,
    });
    return {
      accessToken: token,
    };
  }
}
