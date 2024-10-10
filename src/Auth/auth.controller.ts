import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() input: AuthDto) {
    return this.authService.login(input);
  }

  @Post('signup')
  signup(@Body() input: AuthDto) {
    return this.authService.signup(input);
  }
}
