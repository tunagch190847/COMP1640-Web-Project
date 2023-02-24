import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { UserDetail } from '@core/database/mysql/entity/userDetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserDetailController],
  providers: [UserDetailService],
  imports: [TypeOrmModule.forFeature([UserDetail])],
  exports: [TypeOrmModule, UserDetailService],
})
export class UserDetailModule {}
