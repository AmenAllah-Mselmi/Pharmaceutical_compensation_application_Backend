import { Type } from "class-transformer";
import { IsDate, IsDateString, IsDecimal, IsInt, IsNumber, IsString } from "class-validator"
import { Decimal128 } from "typeorm"

export class CreateTstockDto {
    @IsInt()
  annee: number;

  @IsInt()
  mois: number;

  @IsInt()
  depot: number;

  @IsInt()
  typeProd: number;

  @IsString()
  numLot: string;

  @IsDate()
  @Type(() => Date)
  datePeremp: Date;

  @IsInt()
  quantite: number;

  @IsNumber()
  prixRevient: number;

  @IsNumber()
  pghtReel: number;

  @IsInt()
  produitId: number;
}
