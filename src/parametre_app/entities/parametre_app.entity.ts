import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ParametreApp {
@PrimaryGeneratedColumn()
parametreID : number
@Column()
nomParametre : string
@Column()
valeurParametre : string
@Column()
description : string
}
