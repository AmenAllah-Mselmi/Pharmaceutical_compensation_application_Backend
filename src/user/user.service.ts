import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Rapport } from 'src/rapport/entities/rapport.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rapport)
     private readonly rapportRepository: Repository<Rapport>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.motDePasse, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      motDePasse: hashedPassword,
      rapports: [],
      compensations: [],
      historiques: [],
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.motDePasse) {
      updateUserDto.motDePasse = await bcrypt.hash(updateUserDto.motDePasse, 10);
    }
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected === 0) throw new NotFoundException(`User with ID ${id} not found`);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`User with ID ${id} not found`);
    return { message: `User #${id} deleted successfully` };
  }
  async findByReport(id_rapport: number) {
  const rapport = await this.rapportRepository.findOne({
    where: { rapportID: id_rapport },
    relations: { utilisateur: true }, 
  });

  if (!rapport) throw new NotFoundException(`Report with ID ${id_rapport} not found`);
  return rapport.utilisateur; 
}

}
