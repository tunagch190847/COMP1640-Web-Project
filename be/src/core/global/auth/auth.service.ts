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

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    public jwtService: JwtService,
  ) {}

  async getUserById(user_id: string, role_id) {
    return await this.userService.getUserByUserId(user_id, role_id);
  }

  async returnResponseAuth(userExist): Promise<IResponseAuth> {
    const payloadToken = {
      user_id: userExist.user_id,
      role_id: userExist.role_id,
    };

    const token = this.jwtService.sign(payloadToken, {
      secret: process.env.SECRET_KEY,
      expiresIn: process.env.EXPRIE_TOKEN,
    });

    this.userService.updateUser(userExist.user_id, {
      token,
    });

    return {
      token,
    };
  }

  async login(body: VLogin) {
    const email = await this.userService.getUserByEmail(body.email);

    if (!email)
      throw new HttpException(
        ErrorMessage.GMAIL_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );

    const password = await handleBCRYPTCompare(body.password, email.password);

    if (!password)
      throw new HttpException(
        ErrorMessage.PASSWORD_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );

    const data = await this.returnResponseAuth(email);
    return {
      user_id: email.user_id,
      token: data.token,
    };
  }
}
