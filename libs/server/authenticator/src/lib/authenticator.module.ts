import { Global, Module } from '@nestjs/common';
import { DBModule } from '@arbio/db';
import { JwtStrategy } from './strategy/jwt.strategy';

@Global()
@Module({
  imports: [DBModule],
  controllers: [],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthenticatorModule {}
