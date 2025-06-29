import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DBModule } from '@arbio/db';
import { AuthenticatorModule } from '@arbio/authenticator';

@Module({
  imports: [DBModule, AuthenticatorModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
