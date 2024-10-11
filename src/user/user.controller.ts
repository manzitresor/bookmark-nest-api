import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/Auth/guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getme(@Req() req) {
    return req.user;
  }
}
