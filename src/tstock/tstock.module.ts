import { Module } from '@nestjs/common';
import { TstockService } from './tstock.service';
import { TstockController } from './tstock.controller';
import { Tstock } from './entities/tstock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Tstock]),
      TypeOrmModule.forFeature([Product]),
    ],
  controllers: [TstockController],
  providers: [TstockService],
})
export class TstockModule {}
