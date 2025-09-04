import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StatistiqueJourService } from './statistique_jour.service';
import { CreateStatistiqueJourDto } from './dto/create-statistique_jour.dto';
import { UpdateStatistiqueJourDto } from './dto/update-statistique_jour.dto';

@Controller('statistique-jour')
export class StatistiqueJourController {
  constructor(private readonly statistiqueJourService: StatistiqueJourService) {}

  @Post()
  create(@Body() createStatistiqueJourDto: CreateStatistiqueJourDto) {
    return this.statistiqueJourService.create(createStatistiqueJourDto);
  }

  @Get()
  findAll() {
    return this.statistiqueJourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statistiqueJourService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatistiqueJourDto: UpdateStatistiqueJourDto) {
    return this.statistiqueJourService.update(+id, updateStatistiqueJourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statistiqueJourService.remove(+id);
  }
    @Get("by-date")
  async getByDate(@Query("date") date: string) {
    return this.statistiqueJourService.findByDate(date);
  }
}
