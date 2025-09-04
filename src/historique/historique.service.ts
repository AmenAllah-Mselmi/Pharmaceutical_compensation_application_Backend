import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Historique } from "./entities/historique.entity";
import { CreateHistoriqueDto } from "./dto/create-historique.dto";
import { UpdateHistoriqueDto } from "./dto/update-historique.dto";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class HistoriqueService {
  constructor(
    @InjectRepository(Historique)
    private readonly historiqueRepo: Repository<Historique>,
  ) {}

  async create(dto: CreateHistoriqueDto) {
    const historique = this.historiqueRepo.create({
      dateAction: new Date(dto.dateAction),
      description: dto.description,
      utilisateur: { id: dto.utilisateurId } as Partial<User>, // ✅ safer cast
    });
    return this.historiqueRepo.save(historique);
  }

  async findAll(): Promise<Historique[]> {
    return this.historiqueRepo.find({ relations: ["utilisateur"] }); // ✅ fetch user too
  }

  async findOne(id: number): Promise<Historique | null> {
    const historique = this.historiqueRepo.findOne({
      where: { id },
      relations: ["utilisateur"],
    });
    if (!historique) throw new Error(`Historique with ID ${id} not found`);
    return historique;
  }

  async update(id: number, dto: UpdateHistoriqueDto) {
    const historique = this.historiqueRepo.findOne({
      where: { id },
      relations: ["utilisateur"],
    });
    if (!historique) throw new Error(`Historique with ID ${id} not found`);
    await this.historiqueRepo.update(id, {
      dateAction: dto.dateAction ? new Date(dto.dateAction) : undefined,
      description: dto.description,
      utilisateur: dto.utilisateurId
        ? ({ id: dto.utilisateurId } as Partial<User>)
        : undefined,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const historique = this.historiqueRepo.findOne({
      where: { id },
      relations: ["utilisateur"],
    });
    if (!historique) throw new Error(`Historique with ID ${id} not found`);
    await this.historiqueRepo.delete(id);
  }
}
