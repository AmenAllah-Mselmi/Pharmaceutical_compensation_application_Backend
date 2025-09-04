import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompensationRapportService } from './compensation_rapport.service';
import { CreateCompensationRapportDto } from './dto/create-compensation_rapport.dto';
import { UpdateCompensationRapportDto } from './dto/update-compensation_rapport.dto';

@Controller('compensation-rapport')
export class CompensationRapportController {
  constructor(private readonly compensationRapportService: CompensationRapportService) {}

  @Post()
  create(@Body() createCompensationRapportDto: CreateCompensationRapportDto) {
    return this.compensationRapportService.create(createCompensationRapportDto);
  }

  @Get()
  findAll() {
    return this.compensationRapportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compensationRapportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompensationRapportDto: UpdateCompensationRapportDto) {
    return this.compensationRapportService.update(+id, updateCompensationRapportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compensationRapportService.remove(+id);
  }
}
