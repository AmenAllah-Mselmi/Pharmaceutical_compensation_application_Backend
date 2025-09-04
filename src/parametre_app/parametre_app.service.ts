import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ParametreApp } from "./entities/parametre_app.entity";
import { CreateParametreAppDto } from "./dto/create-parametre_app.dto";
import { UpdateParametreAppDto } from "./dto/update-parametre_app.dto";

@Injectable()
export class ParametreAppService {
  constructor(
    @InjectRepository(ParametreApp)
    private readonly paramRepo: Repository<ParametreApp>,
  ) {}

  async create(createDto: CreateParametreAppDto): Promise<ParametreApp> {
    const param = this.paramRepo.create(createDto);
    return this.paramRepo.save(param);
  }

  async findAll(): Promise<ParametreApp[]> {
    return this.paramRepo.find();
  }

  async findOne(id: number): Promise<ParametreApp | null> {
    const param = await this.paramRepo.findOneBy({ parametreID: id });
    if (!param) throw new Error(`Parametre with ID ${id} not found`);
    return param;
  }

  async update(id: number, updateDto: UpdateParametreAppDto): Promise<ParametreApp> {
       const param = await this.paramRepo.findOneBy({ parametreID: id });
    if (!param) throw new Error(`Parametre with ID ${id} not found`);
    await this.paramRepo.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
       const param = await this.paramRepo.findOneBy({ parametreID: id });
    if (!param) throw new Error(`Parametre with ID ${id} not found`);
    await this.paramRepo.delete(id);
  }
}
