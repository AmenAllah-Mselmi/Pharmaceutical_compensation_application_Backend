import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateRapportDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  typeRapport: string;

  @IsNotEmpty()
  @IsString()
  cheminFichier: string;

  @IsInt()
  utilisateurId: number;
}
