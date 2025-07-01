import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { DBService } from '@arbio/db';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly db: DBService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'] as string,
    });
  }

  async validate(payload: Omit<User, 'password'>) {
    const user = await this.db.user.findUnique({
      where: { email: payload.email },
    });

    if (!user)
      throw new UnauthorizedException(
        'Invalid User, Auth token authorization failed.',
      );

    return user;
  }
}
