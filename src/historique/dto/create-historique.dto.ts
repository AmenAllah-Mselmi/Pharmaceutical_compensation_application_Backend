import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNumber, IsString } from "class-validator"
import { Column } from "typeorm";

export class CreateHistoriqueDto {
  @Type(() => Date)
@IsDate()
  dateAction: Date;

  @IsString()
  description: string;

  @IsNumber()
  utilisateurId: number;
}
