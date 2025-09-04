import { Tstock } from "src/tstock/entities/tstock.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  numPro: number;

  @Column()
  refProd: string;

  @Column("decimal", { precision: 10, scale: 2 }) 
  nouvPrixGrosHT: number;  

  @Column({type: 'date'})
  dateNouvPrixGr: Date;

  @OneToMany(() => Tstock, (stock) => stock.produit)
  stocks: Tstock[];
}
