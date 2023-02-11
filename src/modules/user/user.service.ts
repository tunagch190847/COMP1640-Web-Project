import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EIsDelete } from 'enum';
import { ErrorMessage } from 'enum/error';
import { VLogin } from 'global/user/dto/login.dto';
import { User } from 'src/database/entity/user.entity';
import { handleBCRYPTCompare } from 'src/helper/utils';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    public jwtService: JwtService,
  ) {}

  async login(body: VLogin) {
    const user = await this.getUserByEmail(body.email);

    if (!user)
      throw new HttpException(
        ErrorMessage.GMAIL_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );

    const password = await handleBCRYPTCompare(body.password, user.password);

    if (!password)
      throw new HttpException(
        ErrorMessage.PASSWORD_INCORRECT,
        HttpStatus.BAD_REQUEST,
      );
    const payloadToken = {};

    const token = this.jwtService.sign(payloadToken, {
      secret: 'cmac56116c11a8s189a1s9c891a13cs',
      expiresIn: 100000,
    });
    return {
      user_id: user.user_id,
      token: token,
    };
  }

  async getUserByEmail(email: string, entityManager?: EntityManager) {
    const userRepository = entityManager
      ? entityManager.getRepository<User>('user')
      : this.userRepository;
    return await userRepository.findOne({
      where: {
        email,
        is_deleted: EIsDelete.NOT_DELETE,
      },
    });
  }
}
