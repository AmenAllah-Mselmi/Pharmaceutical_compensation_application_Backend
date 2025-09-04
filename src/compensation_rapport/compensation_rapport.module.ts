import { Module } from '@nestjs/common';
import { CompensationRapportService } from './compensation_rapport.service';
import { CompensationRapportController } from './compensation_rapport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompensationRapport } from './entities/compensation_rapport.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([CompensationRapport]), // ✅ registers the repository for injection
    ],
  controllers: [CompensationRapportController],
  providers: [CompensationRapportService],
})
export class CompensationRapportModule {}
