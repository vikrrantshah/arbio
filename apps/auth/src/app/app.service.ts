import { DBService } from '@arbio/db';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    private readonly db: DBService,
    private readonly jwtService: JwtService
  ) {}

  async verifyUser(
    email: string,
    password: string
  ): Promise<Omit<User, 'password'>> {
    const { password: userPassword, ...user } = await this.db.user.findUnique({
      where: { email },
    });

    if (!user)
      throw new UnauthorizedException('Invalid user email or password');

    const isValid = await bcrypt.compare(password, userPassword);

    if (!isValid)
      throw new UnauthorizedException('Invalid user email or password');

    return user;
  }

  async login(user: Omit<User, 'password'>) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
