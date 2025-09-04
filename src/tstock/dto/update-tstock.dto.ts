import { PartialType } from '@nestjs/mapped-types';
import { CreateTstockDto } from './create-tstock.dto';

export class UpdateTstockDto extends PartialType(CreateTstockDto) {}
