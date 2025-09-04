import { PartialType } from '@nestjs/mapped-types';
import { CreateCompensationRapportDto } from './create-compensation_rapport.dto';

export class UpdateCompensationRapportDto extends PartialType(CreateCompensationRapportDto) {}
