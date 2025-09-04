import { Module } from '@nestjs/common';
import { StatistiqueJourService } from './statistique_jour.service';
import { StatistiqueJourController } from './statistique_jour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatistiqueJour } from './entities/statistique_jour.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([StatistiqueJour]), // ✅ registers the repository for injection
    ],
  controllers: [StatistiqueJourController],
  providers: [StatistiqueJourService],
})
export class StatistiqueJourModule {}
