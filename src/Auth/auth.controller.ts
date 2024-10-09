import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() input: AuthDto) {
    console.log(input);
    return 'User sign in';
  }

  @Post('signup')
  signup(@Body() input: any) {
    console.log(input);
    return 'User sign up ';
  }
}
