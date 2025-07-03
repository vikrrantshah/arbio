import { DBService } from '@arbio/db';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    private readonly db: DBService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Omit<User, 'password'>> {
    const dbUser = await this.db.user.findUnique({
      where: { email },
    });

    if (!dbUser)
      throw new UnauthorizedException('Invalid user email or password');

    const { password: userPassword, ...user } = dbUser;
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

  async registerUser(user: Omit<User, 'id'>) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    return this.db.user.create({ data: { ...user, password: hashedPassword } });
  }
}
