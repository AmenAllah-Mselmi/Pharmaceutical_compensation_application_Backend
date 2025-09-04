/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TstockModule } from './tstock/tstock.module';
import { CompensationModule } from './compensation/compensation.module';
import { RapportModule } from './rapport/rapport.module';
import { CompensationRapportModule } from './compensation_rapport/compensation_rapport.module';
import { HistoriqueModule } from './historique/historique.module';
import { ParametreAppModule } from './parametre_app/parametre_app.module';
import { StatistiqueJourModule } from './statistique_jour/statistique_jour.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // ou 'postgres'
      host: '127.0.0.1',
      port: 3306, // 5432 pour PostgreSQL
      username: 'root',
      password: '',
      database: 'pharmacie',
      autoLoadEntities: true, // charge automatiquement les entités
      synchronize: true, // ⚠️ en prod, mettre false
    }),
    UserModule,
    ProductModule,
    TstockModule,
    CompensationModule,
    RapportModule,
    CompensationRapportModule,
    HistoriqueModule,
    ParametreAppModule,
    StatistiqueJourModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
