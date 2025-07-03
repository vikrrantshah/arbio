import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './local.guard';
import { Request as ExpressRequest } from 'express';
import { SignUpFormSchema } from '@arbio/schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(@Request() req: ExpressRequest & { user: Omit<User, 'password'> }) {
    return this.appService.login(req.user);
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() body: Omit<User, 'id'>) {
    try {
      SignUpFormSchema.parse(body);

      const { password: _, ...createdUser } =
        await this.appService.registerUser(body);
      return this.appService.login(createdUser);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
