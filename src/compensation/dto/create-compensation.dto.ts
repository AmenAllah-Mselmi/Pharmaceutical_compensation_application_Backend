import { Type } from "class-transformer";
import { IsDate, IsString, IsNotEmpty, IsInt, IsNumber, Min } from "class-validator";

export class CreateCompensationDto {
  @Type(() => Date)
  @IsDate()
  dateCompensation: Date;

  // REPLACE IsDecimal() with proper number validation
  @IsNumber({}, { message: 'montantTotal must be a valid number' })
  @Min(0, { message: 'montantTotal cannot be negative' })
  montantTotal: number; // Change from string to number

  @IsString()
  @IsNotEmpty()
  etat: string;

  @IsInt()
  @IsNotEmpty()
  utilisateurId: number;
}