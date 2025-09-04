import { IsString } from "class-validator"

export class CreateParametreAppDto {
    @IsString()
nomParametre : string
@IsString()
valeurParametre : string
@IsString()
description : string
}
