import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Double, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
      stocks: [],
    });
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
     const product = await this.productRepository.findOneBy({ numPro: id });
    if(!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
     const product = await this.productRepository.findOneBy({ numPro: id });
    if(!product) throw new NotFoundException(`Product with ID ${id} not found`);
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ numPro: id });
    if(!product) throw new NotFoundException(`Product with ID ${id} not found`);
    await this.productRepository.delete(id);
  }
async Average(): Promise<string> {
const result=  await this.productRepository
  .createQueryBuilder('product')
  .select('AVG(product.nouvPrixGrosHT)', 'average')
  .getRawOne();
  return  result.average ?? "0.00";
}

}
