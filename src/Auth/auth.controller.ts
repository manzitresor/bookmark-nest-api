import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('signup')
  signup() {
    return 'User sign up ';
  }
  @Get('signin')
  signin() {
    return 'User sign in';
  }
}
