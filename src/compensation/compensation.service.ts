import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compensation } from './entities/compensation.entity';
import { CreateCompensationDto } from './dto/create-compensation.dto';
import { UpdateCompensationDto } from './dto/update-compensation.dto';
import { User } from 'src/user/entities/user.entity';
import { Rapport } from 'src/rapport/entities/rapport.entity';

@Injectable()
export class CompensationService {
  constructor(
    @InjectRepository(Compensation)
    private readonly compRepo: Repository<Compensation>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Add this validation utility method
  private validateId(id: number): void {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID parameter');
    }
  }

  async create(dto: CreateCompensationDto) {
    const utilisateur = await this.userRepo.findOneBy({ id: dto.utilisateurId });
    if (!utilisateur) throw new NotFoundException(`User not found`);
    
    const compensation = this.compRepo.create({
      dateCompensation: new Date(dto.dateCompensation),
      montantTotal: dto.montantTotal,
      etat: dto.etat,
      utilisateur: { id: dto.utilisateurId } as Partial<User>,
      rapports: [],
    });
    return this.compRepo.save(compensation);
  }

  async findAll(): Promise<Compensation[]> {
    return this.compRepo.find({ relations: ['utilisateur'] });
  }

  async findOne(id: number): Promise<Compensation | null> {
    this.validateId(id); // Validate ID before query
    return this.compRepo.findOne({ 
      where: { compensationID: id }, 
      relations: ['utilisateur'] 
    });
  }

  async update(id: number, dto: UpdateCompensationDto) {
    this.validateId(id); // Validate ID before update
    await this.compRepo.update(id, {
      dateCompensation: dto.dateCompensation ? new Date(dto.dateCompensation) : undefined,
      montantTotal: dto.montantTotal,
      etat: dto.etat,
      utilisateur: dto.utilisateurId ? ({ id: dto.utilisateurId } as Partial<User>) : undefined,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    this.validateId(id); // Validate ID before delete
    await this.compRepo.delete(id);
  }

  async Total_sum(): Promise<string> {
    const result = await this.compRepo
      .createQueryBuilder("comp")
      .select("SUM(comp.montantTotal)", "total")
      .getRawOne();

    const totalStr = result.total ?? "0.00";
    return isNaN(parseFloat(totalStr)) ? "0.00" : totalStr;
  }

  async count(): Promise<number> {
     return this.compRepo.count();
  }

  async Average_sum(etat: string): Promise<string> {
    // Enhanced validation
    if (!etat || typeof etat !== 'string' || etat.trim() === '') {
      return "0.00";
    }

    try {
      const result = await this.compRepo
        .createQueryBuilder("comp")
        .select("AVG(comp.montantTotal)", "avg")
        .where("comp.etat = :etat", { etat: etat.trim() })
        .getRawOne();

      return result.avg ?? "0.00";
    } catch (error) {
      console.error('Error in Average_sum:', error);
      return "0.00";
    }
  }

  async all_reports(id: number): Promise<Rapport[]> {
    this.validateId(id); // Validate ID before query
    const compensation = await this.compRepo.findOne({
      where: { compensationID: id },
      relations: ["rapports"]
    });
    
    if (!compensation) {
      throw new NotFoundException(`Compensation with ID ${id} not found`);
    }
    
    return compensation.rapports;
  }
}