import { IsNumber } from "class-validator"

export class CreateCompensationRapportDto {
 @IsNumber()
 compensationID : number
 @IsNumber()
 rapportID : number
}
