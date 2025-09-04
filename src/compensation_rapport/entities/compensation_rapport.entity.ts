import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class CompensationRapport {
@PrimaryGeneratedColumn()
 compRapID : number
 @Column()        
 compensationID : number
 @Column()
 rapportID : number
}
