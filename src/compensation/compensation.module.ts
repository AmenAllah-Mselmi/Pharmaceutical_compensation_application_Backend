import { Module } from '@nestjs/common';
import { CompensationService } from './compensation.service';
import { CompensationController } from './compensation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compensation } from './entities/compensation.entity';
import { User } from 'src/user/entities/user.entity';
import { Rapport } from 'src/rapport/entities/rapport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compensation]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Rapport]),
  ],
  controllers: [CompensationController],
  providers: [CompensationService],
})
export class CompensationModule {}
