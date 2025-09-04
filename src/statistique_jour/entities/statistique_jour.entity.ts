import { Column, Decimal128, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StatistiqueJour {
    @PrimaryGeneratedColumn()
statID : number
@Column({type: 'date'})
dateStat : Date
@Column()
totalCompensations : number
@Column("decimal", { precision: 10, scale: 2 }) 
montantTotal : string
}
