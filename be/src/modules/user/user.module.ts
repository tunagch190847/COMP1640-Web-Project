import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/database/mysql/entity/user.entity';
import { AuthModule } from 'src/core/global/auth/auth.module';
import { UserDetailModule } from '@modules/user-detail/user-detail.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]), 
    forwardRef(() => AuthModule),
    UserDetailModule,
  ],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
