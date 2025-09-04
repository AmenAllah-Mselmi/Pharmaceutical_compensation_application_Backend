import { Module } from '@nestjs/common';
import { RapportService } from './rapport.service';
import { RapportController } from './rapport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rapport } from './entities/rapport.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Rapport]),
       TypeOrmModule.forFeature([User]),
    ],
  controllers: [RapportController],
  providers: [RapportService],
})
export class RapportModule {}
