import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '@prisma/client';
import { AppService } from '../app.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly appService: AppService) {
    super({
      usernameField: 'email',
    });
  }

  validate(email: string, password: string): Promise<Omit<User, 'password'>> {
    return this.appService.verifyUser(email, password);
  }
}
