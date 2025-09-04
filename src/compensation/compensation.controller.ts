import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CompensationService } from './compensation.service';
import { CreateCompensationDto } from './dto/create-compensation.dto';
import { UpdateCompensationDto } from './dto/update-compensation.dto';

@Controller('compensation')
export class CompensationController {
  constructor(private readonly compensationService: CompensationService) {}
   @Get('count')
async count() {
  const count = await this.compensationService.count();
  return { count: count };
}
 @Get('total-sum')
  getTotalSum(): Promise<string> {
    return this.compensationService.Total_sum();
  }
  @Post()
  create(@Body() createCompensationDto: CreateCompensationDto) {
    return this.compensationService.create(createCompensationDto);
  }

  @Get()
  findAll() {
    return this.compensationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { // Use ParseIntPipe for validation
    return this.compensationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, // Use ParseIntPipe
    @Body() updateCompensationDto: UpdateCompensationDto
  ) {
    return this.compensationService.update(id, updateCompensationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { // Use ParseIntPipe
    return this.compensationService.remove(id);
  }

  @Get('sum_etat/:etat')
  Sum_etat(@Param('etat') etat: string) {
    // Enhanced validation
    if (!etat || etat.toLowerCase() === 'nan' || etat === 'undefined' || etat === 'null') {
      return "0.00";
    }
    return this.compensationService.Average_sum(etat);
  }

  @Get('all_reports/:id')
  all_reports(@Param('id', ParseIntPipe) id: number) { // Use ParseIntPipe
    return this.compensationService.all_reports(id);
  }


}