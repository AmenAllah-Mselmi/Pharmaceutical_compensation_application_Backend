import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rapport } from './entities/rapport.entity';
import { CreateRapportDto } from './dto/create-rapport.dto';
import { UpdateRapportDto } from './dto/update-rapport.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RapportService {
  constructor(
    @InjectRepository(Rapport)
    private readonly rapportRepository: Repository<Rapport>,
     @InjectRepository(User)
    private readonly userService: Repository<User>,
  ) {}

  async create(createRapportDto: CreateRapportDto): Promise<Rapport> {
    const utilisateur = await this.userService.findOneBy({ id: createRapportDto.utilisateurId });
    if (!utilisateur) throw new NotFoundException(`User not found`);
    const rapport = this.rapportRepository.create({
      titre: createRapportDto.titre,
      typeRapport: createRapportDto.typeRapport,
      cheminFichier: createRapportDto.cheminFichier,
      utilisateur, 
      compensations: [],
    });

    return this.rapportRepository.save(rapport);
  }

  async findAll(): Promise<Rapport[]> {
    return this.rapportRepository.find();
  }

  async findOne(id: number): Promise<Rapport> {
    const rapport = await this.rapportRepository.findOneBy({ rapportID: id });
    if (!rapport) throw new NotFoundException(`Rapport with ID ${id} not found`);
    return rapport;
  }

  async update(id: number, updateRapportDto: UpdateRapportDto): Promise<Rapport> {
    const rapport = await this.rapportRepository.findOneBy({ rapportID: id });
    if (!rapport) throw new NotFoundException(`Rapport with ID ${id} not found`);
    await this.rapportRepository.update(id, updateRapportDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const rapport = await this.rapportRepository.findOneBy({ rapportID: id });
    if (!rapport) throw new NotFoundException(`Rapport with ID ${id} not found`);
    await this.rapportRepository.delete(id);
  }
}
