import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DBModule } from '@arbio/db';
import { AuthenticatorModule } from '@arbio/authenticator';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [DBModule, AuthenticatorModule, TodoModule],
  controllers: [AppController],
  providers: [DBModule],
})
export class AppModule {}
