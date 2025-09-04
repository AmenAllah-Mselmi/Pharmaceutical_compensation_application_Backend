import { Type } from "class-transformer";
import { IsDate } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Historique {
    @PrimaryGeneratedColumn()
id : number

@Column({type: 'date'})
dateAction : Date
@Column()
description : string
 @ManyToOne(() => User, (user) => user.historiques)
utilisateur: User;
}
