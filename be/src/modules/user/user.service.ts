import { IUserData } from '@core/interface/default.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EIsDelete } from 'enum';
import { EUserRole } from 'enum/default.enum';
import { ErrorMessage } from 'enum/error';
import { VSignUp } from 'global/dto/signup.dto';
import { VUpdateAccount } from 'global/dto/update-account.dto';
import { VLogin } from 'global/user/dto/login.dto';
import { User } from 'src/core/database/mysql/entity/user.entity';
import { AuthService } from 'src/core/global/auth/auth.service';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async login(body: VLogin) {
    return await this.authService.login(body);
  }

  async signup(userData: IUserData, body: VSignUp) {
    return await this.authService.signup(userData, body);
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

  async getUserByUserId(
    userId: string,
    role_id: number,
    entityManager?: EntityManager,
  ) {
    const userRepository = entityManager
      ? entityManager.getRepository<User>('user')
      : this.userRepository;
    return await userRepository.findOne({
      where: {
        user_id: userId,
        role_id: role_id,
        is_deleted: EIsDelete.NOT_DELETE,
      },
    });
  }

  async checkUserByUserId(userId: string, entityManager?: EntityManager) {
    const userRepository = entityManager
      ? entityManager.getRepository<User>('user')
      : this.userRepository;
    return await userRepository.findOne({
      where: {
        user_id: userId,
      },
    });
  }

  async updateUser(
    user_id: string,
    body: DeepPartial<User>,
    entityManager?: EntityManager,
  ) {
    const userRepository = entityManager
      ? entityManager.getRepository<User>('user')
      : this.userRepository;
    return await userRepository.update({ user_id }, body);
  }

  async createUser(body: DeepPartial<User>, entityManager?: EntityManager) {
    const userRepository = entityManager
      ? entityManager.getRepository<User>('user')
      : this.userRepository;

    return await userRepository.save(body);
  }

  async findUserByUserId(userId: string, entityManager?: EntityManager) {
    const userRepository = entityManager
      ? entityManager.getRepository<User>('user')
      : this.userRepository;
    return await userRepository.findOne({
      where: {
        user_id: userId,
        is_deleted: EIsDelete.NOT_DELETE,
      },
      relations: ['userDetail'],
    });
  }

  async getAllUsers(entityManager?: EntityManager) {
    const userRepository = entityManager
      ? entityManager.getRepository<User>('user')
      : this.userRepository;

    const users = await userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .getMany();

    return users.map((user) => {
      return {
        user_id: user.user_id,
        email: user.email,
        is_deleted: 0,
        role: {
          role_id: user.role_id,
          name: user.role.name,
        },
      };
    });
  }

  async handleLogout(userId: string) {
    await this.authService.logout(userId);
    return null;
  }
  async updateAccount(
    userData: IUserData,
    user_id: string,
    body: VUpdateAccount,
    entityManager?: EntityManager,
  ) {
    const userRepository = entityManager
      ? entityManager.getRepository<User>('user')
      : this.userRepository;

    if (userData.role_id != EUserRole.ADMIN) {
      throw new HttpException(
        ErrorMessage.YOU_DO_NOT_HAVE_PERMISSION_EDIT_ACCOUNT,
        HttpStatus.BAD_REQUEST,
      );
    }
    const userID = await this.checkUserByUserId(user_id);

    if (!userID) {
      throw new HttpException(
        ErrorMessage.USER_NOT_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    const userParam = new User();
    userParam.role_id = body.role_id;
    userParam.department_id = body.department_id;
    userParam.is_deleted = body.is_deleted;

    await userRepository.update({ user_id: user_id }, userParam);
    return;
  }
}
