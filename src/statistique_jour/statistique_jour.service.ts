import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatistiqueJour } from './entities/statistique_jour.entity';
import { CreateStatistiqueJourDto } from './dto/create-statistique_jour.dto';
import { UpdateStatistiqueJourDto } from './dto/update-statistique_jour.dto';

@Injectable()
export class StatistiqueJourService {
  constructor(
    @InjectRepository(StatistiqueJour)
    private readonly statistiqueJourRepository: Repository<StatistiqueJour>,
  ) {}

 async create(dto: CreateStatistiqueJourDto): Promise<StatistiqueJour> {
    const statistique = this.statistiqueJourRepository.create({
      dateStat: new Date(dto.dateStat), // convert string -> Date
      totalCompensations: dto.totalCompensations,
      montantTotal: dto.montantTotal,
    });

    return this.statistiqueJourRepository.save(statistique);
  }

  findAll() {
    return this.statistiqueJourRepository.find();
  }

  async findOne(id: number) {
    const entity = await this.statistiqueJourRepository.findOne({ where: { statID: id } });
    if (!entity) throw new NotFoundException(`StatistiqueJour with ID ${id} not found`);
    return entity;
  }

  async update(id: number, updateDto: UpdateStatistiqueJourDto) {
    const result = await this.statistiqueJourRepository.update(id, updateDto);
    if (result.affected === 0) throw new NotFoundException(`StatistiqueJour with ID ${id} not found`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.statistiqueJourRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`StatistiqueJour with ID ${id} not found`);
    return { message: `StatistiqueJour #${id} deleted successfully` };
  }
   async findByDate(date: string): Promise<StatistiqueJour[]> {
    return this.statistiqueJourRepository.find({
      where: { dateStat: new Date(date) },
    });
  }
}
