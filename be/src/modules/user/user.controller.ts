import { UserData } from '@core/decorator/user.decorator';
import { IUserData } from '@core/interface/default.interface';
import { UserDetailService } from '@modules/user-detail/user-detail.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VSignUp } from 'global/dto/signup.dto';
import { VLogin } from 'global/user/dto/login.dto';
import { Public } from 'src/core/decorator/public.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userDetailService: UserDetailService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: VLogin) {
    return this.userService.login(body);
  }

  @Post('signup')
  async signup(@UserData() userData: IUserData, @Body() body: VSignUp) {
    return this.userService.signup(userData, body);
  }

  @Get()
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @Get(':user_id')
  getUserDetail(@Param('user_id') user_id: string) {
    return this.userDetailService.getUserDetail(user_id);
  }
}
