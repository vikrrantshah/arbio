import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '@prisma/client';
import { AppService } from '../app.service';
import { LoginFormSchema } from '@arbio/schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly appService: AppService) {
    super({
      usernameField: 'email',
    });
  }

  validate(email: string, password: string): Promise<Omit<User, 'password'>> {
    try {
      LoginFormSchema.parse({ email, password });
      return this.appService.verifyUser({ email, password });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
