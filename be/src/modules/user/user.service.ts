import { IUserData } from '@core/interface/default.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EIsDelete } from 'enum';
import { VSignUp } from 'global/dto/signup.dto';
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
  
    return users.map(user => {
      return {
        user_id: user.user_id,
        email: user.email,
        is_deleted: 0,
        role: {
          role_id: user.role_id,
          name: user.role.name,
        }
      }
    });
  }
}
