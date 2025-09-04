import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rapport } from 'src/rapport/entities/rapport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    TypeOrmModule.forFeature([Rapport]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
