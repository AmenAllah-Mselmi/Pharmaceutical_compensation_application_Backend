/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enum";
import { Compensation } from "src/compensation/entities/compensation.entity";
import { Rapport } from "src/rapport/entities/rapport.entity";
import { Historique } from "src/historique/entities/historique.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    nom : string
    @Column()
    email : string
    @Column()
    motDePasse : string
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role : UserRole
    @OneToMany(() => Compensation, (comp) => comp.utilisateur)
  compensations: Compensation[];

  @OneToMany(() => Rapport, (rapport) => rapport.utilisateur)
  rapports: Rapport[];

  @OneToMany(() => Historique, (hist) => hist.utilisateur)
  historiques: Historique[];
}
