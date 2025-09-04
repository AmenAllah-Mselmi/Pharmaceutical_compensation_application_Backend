import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CompensationRapport } from "./entities/compensation_rapport.entity";
import { CreateCompensationRapportDto } from "./dto/create-compensation_rapport.dto";
import { UpdateCompensationRapportDto } from "./dto/update-compensation_rapport.dto";

@Injectable()
export class CompensationRapportService {
  constructor(
    @InjectRepository(CompensationRapport)
    private readonly compRapRepo: Repository<CompensationRapport>,
  ) {}

 async create(dto: CreateCompensationRapportDto) {
  const compRap = this.compRapRepo.create({
    compensationID: dto.compensationID, // just the number
    rapportID: dto.rapportID,           // just the number
  });
  return this.compRapRepo.save(compRap);
}

  async findAll(): Promise<CompensationRapport[]> {
    return this.compRapRepo.find({ relations: ["compensation", "rapport"] });
  }

  async findOne(id: number): Promise<CompensationRapport | null> {

    const compRap = this.compRapRepo.findOne({
      where: { compRapID: id },
      relations: ["compensation", "rapport"],
    });
    if(!compRap) throw new Error(`CompensationRapport with ID ${id} not found`); 
    return compRap;
  }

async update(id: number, dto: UpdateCompensationRapportDto) {
  const compRap = this.compRapRepo.findOne({
      where: { compRapID: id },
      relations: ["compensation", "rapport"],
    });
    if(!compRap) throw new Error(`CompensationRapport with ID ${id} not found`); 
  await this.compRapRepo.update(id, {
    compensationID: dto.compensationID ? ({ id: dto.compensationID } as any) : undefined,
    rapportID: dto.rapportID ? ({ id: dto.rapportID } as any) : undefined,
  });
  return this.findOne(id);
}

  async remove(id: number): Promise<void> {
    const compRap = this.compRapRepo.findOne({
      where: { compRapID: id },
      relations: ["compensation", "rapport"],
    });
    if(!compRap) throw new Error(`CompensationRapport with ID ${id} not found`); 
    await this.compRapRepo.delete(id);
  }
}
