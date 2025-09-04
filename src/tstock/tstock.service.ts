import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tstock } from './entities/tstock.entity';
import { CreateTstockDto } from './dto/create-tstock.dto';
import { UpdateTstockDto } from './dto/update-tstock.dto';
import {  } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';
@Injectable()
export class TstockService {
  constructor(
    @InjectRepository(Tstock)
    private readonly tstockRepository: Repository<Tstock>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createTstockDto: CreateTstockDto) {
  const product = await this.productRepository.findOne({ 
    where: { numPro: createTstockDto.produitId } 
  });
  
  if (!product) {
    throw new NotFoundException(`Product with ID ${createTstockDto.produitId} not found`);
  }
  
  const tstock = this.tstockRepository.create({
    ...createTstockDto,
    produit: product
  });
  
  return this.tstockRepository.save(tstock);
}

  findAll() {
    return this.tstockRepository.find();
  }

  async findOne(id: number) {
    const tstock = await this.tstockRepository.findOne({ where: { id } });
    if (!tstock) throw new NotFoundException(`Tstock with ID ${id} not found`);
    return tstock;
  }

  async update(id: number, updateTstockDto: UpdateTstockDto) {
    const result = await this.tstockRepository.update(id, updateTstockDto);
    if (result.affected === 0) throw new NotFoundException(`Tstock with ID ${id} not found`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.tstockRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Tstock with ID ${id} not found`);
    return { message: `Tstock #${id} deleted successfully` };
  }
  async findQuantityByProductId() {
    const result=[]
    const tstocks = await this.tstockRepository.find({relations: ['produit']});
    for (const tstock of tstocks) {
      const numberOfProducts = await this.tstockRepository.count({ where: { produit: tstock.produit } });
      result.push({ id: tstock.produit.numPro, quantity: numberOfProducts });
    }
    return result;
  }
}
