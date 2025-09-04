import { Compensation } from "src/compensation/entities/compensation.entity"
import { User } from "src/user/entities/user.entity"
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Rapport {
    @PrimaryGeneratedColumn()
rapportID : number
@Column()
 titre : string
 @Column()
 typeRapport : string
 @Column()
 cheminFichier : string
 @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
 dateGeneration : Date
 
 @ManyToOne(() => User, (user) => user.rapports)
  utilisateur: User;

  @ManyToMany(() => Compensation, (comp) => comp.rapports)
  compensations: Compensation[];
}
