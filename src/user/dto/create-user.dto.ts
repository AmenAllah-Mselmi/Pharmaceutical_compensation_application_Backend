import { IsEmail, IsEnum, IsOptional, IsString,  MinLength } from "class-validator"
import { UserRole } from "../enum"

/* eslint-disable prettier/prettier */
export class CreateUserDto {
        @IsString()   
        nom : string 
        @IsEmail()
        email : string
        @IsString()
        @MinLength(6)
        motDePasse : string
        @IsOptional()
        @IsEnum(UserRole)
        role? : UserRole
}
