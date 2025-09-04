import { IsDateString, IsInt, IsString, IsNotEmpty, IsPositive, IsOptional } from "class-validator";
import { Rapport } from "src/rapport/entities/rapport.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Compensation {
  @PrimaryGeneratedColumn()
  compensationID: number;

  @Column({ type: 'date', nullable: true }) // Make it nullable
  dateCompensation: Date;

// Change from string to decimal type for numbers
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  montantTotal: number; // Change from string to number


  @Column()
  etat: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @ManyToOne(() => User, (user) => user.compensations)
  utilisateur: User;

  @ManyToMany(() => Rapport, (rapport) => rapport.compensations)
  @JoinTable()
  rapports: Rapport[];
}