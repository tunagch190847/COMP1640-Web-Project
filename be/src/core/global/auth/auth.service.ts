/* eslint-disable @typescript-eslint/no-var-requires */
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ErrorMessage } from 'enum/error';
import { VLogin } from 'global/user/dto/login.dto';
import { handleBCRYPTCompare } from 'src/helper/utils';

import { UserService } from 'src/modules/user/user.service';
import { IResponseAuth } from './interface';

// import admin from 'src/main';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    public jwtService: JwtService,
  ) {}

  async getUserById(user_id: string) {
    return await this.userService.getUserByUserId(user_id);
  }

  async returnResponseAuth(userExist): Promise<IResponseAuth> {
    const payloadToken = {
      user_id: userExist.user_id,
    };

    const token = this.jwtService.sign(payloadToken, {
      secret: 'cmac56116c11a8s189a1s9c891a13cs',
      expiresIn: 100000,
    });

    this.userService.updateUser(userExist.user_id, {
      token,
    });

    return {
      token,
    };
  }

  async login(body: VLogin) {
    const user = await this.userService.getUserByEmail(body.email);

    if (!user)
      throw new HttpException(
        ErrorMessage.GMAIL_ALREADY_EXITS,
        HttpStatus.BAD_REQUEST,
      );

    const password = await handleBCRYPTCompare(body.password, user.password);

    if (!password)
      throw new HttpException(
        ErrorMessage.PASSWORD_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );
    // const payloadToken = {
    //   user_id: user.user_id,
    // };

    const data = await this.returnResponseAuth(user);
    return {
      user_id: user.user_id,
      token: data.token,
    };
  }
}
