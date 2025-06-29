import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './local.guard';
import { Request as ExpressRequest } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: ExpressRequest & { user: Omit<User, 'password'> }
  ) {
    return this.appService.login(req.user);
  }
}
