import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DBModule } from '@arbio/db';

@Module({
  imports: [DBModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
