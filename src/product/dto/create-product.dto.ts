import { Type } from "class-transformer";
import { IsDecimal, IsString, IsDateString, IsDate, Min, IsNumber } from "class-validator";

export class CreateProductDto {
  @IsString()
  refProd: string;

   @IsNumber({}, { message: 'montantTotal must be a valid number' })
    @Min(0, { message: 'montantTotal cannot be negative' })
  nouvPrixGrosHT: number;   // string (ex: "123.45")

  @Type(() => Date)
  @IsDate()
  dateNouvPrixGr: string;   // string en format ISO ("2025-08-28")
}
