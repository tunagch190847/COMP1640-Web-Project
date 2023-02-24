import { UserData } from '@core/decorator/user.decorator';
import { IUserData } from '@core/interface/default.interface';
import { Body, Controller, Post } from '@nestjs/common';
import { VSignUp } from 'global/dto/signup.dto';
import { VLogin } from 'global/user/dto/login.dto';
import { Public } from 'src/core/decorator/public.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('login')
  async login(@Body() body: VLogin) {
    return this.userService.login(body);
  }

  @Post('signup')
  async signup(@UserData() userData: IUserData, @Body() body: VSignUp) {
    return this.userService.signup(userData, body);
  }
}
