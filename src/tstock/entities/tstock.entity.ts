import { Product } from "src/product/entities/product.entity";
import { Column, Decimal128, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tstock {
  @PrimaryGeneratedColumn()
 id : number
 @Column()
 annee : number
 @Column()
 mois : number
 @Column()
 depot : number
 @Column()
 typeProd : number
 @Column()
 numLot : string
 @Column()
 datePeremp : Date
 @Column()
 quantite : number
 @Column()
 prixRevient : number
 @Column()
 pghtReel : number
  @ManyToOne(() => Product, (produit) => produit.stocks)
  produit: Product;
}
