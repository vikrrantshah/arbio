import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './local.guard';
import { Request as ExpressRequest } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(
    @Request() req: ExpressRequest & { user: Omit<User, 'password'> },
    @Body() _body: { email: User['email']; password: User['password'] },
  ) {
    return this.appService.login(req.user);
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() body: Omit<User, 'id'>) {
    const { password: _, ...createdUser } =
      await this.appService.registerUser(body);
    return this.appService.login(createdUser);
  }
}
