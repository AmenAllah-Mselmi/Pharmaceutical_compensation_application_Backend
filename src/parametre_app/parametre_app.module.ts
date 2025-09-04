import { Module } from '@nestjs/common';
import { ParametreAppService } from './parametre_app.service';
import { ParametreAppController } from './parametre_app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametreApp } from './entities/parametre_app.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([ParametreApp]), // ✅ registers the repository for injection
    ],
  controllers: [ParametreAppController],
  providers: [ParametreAppService],
})
export class ParametreAppModule {}
