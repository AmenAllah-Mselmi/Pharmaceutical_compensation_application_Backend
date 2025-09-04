import { PartialType } from '@nestjs/mapped-types';
import { CreateParametreAppDto } from './create-parametre_app.dto';

export class UpdateParametreAppDto extends PartialType(CreateParametreAppDto) {}
