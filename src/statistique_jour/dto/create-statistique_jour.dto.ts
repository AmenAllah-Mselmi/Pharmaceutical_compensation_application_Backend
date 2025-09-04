import { Type } from "class-transformer";
import { IsDate, IsDateString, IsDecimal, IsNumber } from "class-validator"

export class CreateStatistiqueJourDto {
 @Type(() => Date)      
  @IsDate()
  dateStat: Date;
    @IsNumber()
    totalCompensations : number
    @IsDecimal()
    montantTotal : string
}
