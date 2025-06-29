import { Module } from '@nestjs/common';
import { DBModule } from '@arbio/db';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthenticatorModule {}
