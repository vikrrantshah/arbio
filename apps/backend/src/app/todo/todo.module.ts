import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [TodoController],
})
export class TodoModule {}
