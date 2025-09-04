import { PartialType } from '@nestjs/mapped-types';
import { CreateStatistiqueJourDto } from './create-statistique_jour.dto';

export class UpdateStatistiqueJourDto extends PartialType(CreateStatistiqueJourDto) {}
