import { JwtAuthGuard } from '@arbio/authenticator';
import { DBService } from '@arbio/db';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ToDo } from '@prisma/client';
import { ZodError } from 'zod';
import { CreateTodoSchema, UpdateTodoSchema } from '@arbio/schema';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly db: DBService) {}

  @Get('/user/:id')
  getTodos(@Param() params: { id: string }) {
    const id = parseInt(params.id);
    if (isNaN(id)) throw new BadRequestException('Invalid id');

    return this.db.toDo.findMany({ where: { userId: id } });
  }

  @Get('/:id')
  async getTodoById(@Param() params: { id: string }) {
    const id = parseInt(params.id);
    if (isNaN(id)) throw new BadRequestException('Invalid id');

    const todo = await this.db.toDo.findUnique({ where: { id } });
    if (!todo) throw new NotFoundException(`No todo with id ${id} was found`);

    return todo;
  }

  @Post('/')
  createTodo(@Body() body: Omit<ToDo, 'id' | 'completed'>) {
    try {
      CreateTodoSchema.parse(body);
      const { userId, ...todo } = body;

      return this.db.toDo.create({
        data: {
          ...todo,
          completed: false,
          user: { connect: { id: userId } },
        },
      });
    } catch (error) {
      if (error instanceof ZodError) throw new BadRequestException(error);
    }
  }

  @Patch('/:id')
  async updateTodo(
    @Param() params: { id: string },
    @Body() body: Omit<Partial<ToDo>, 'id'>,
  ) {
    const id = parseInt(params.id);
    if (isNaN(id)) throw new BadRequestException('Invalid id');

    try {
      UpdateTodoSchema.parse(body);
      const updatedTodo = await this.db.toDo.update({
        where: { id },
        data: body,
      });

      return updatedTodo;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No todo with id ${id} was found`);
      }

      if (error instanceof ZodError) throw new BadRequestException(error);

      throw error;
    }
  }

  @Delete('/:id')
  async deleteTodo(@Param() params: { id: string }) {
    const id = parseInt(params.id);
    if (isNaN(id)) throw new BadRequestException('Invalid id');

    try {
      const deletedTodo = await this.db.toDo.delete({ where: { id } });
      return deletedTodo;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No todo with id ${id} was found`);
      }

      throw error;
    }
  }
}
