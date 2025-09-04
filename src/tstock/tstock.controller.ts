import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TstockService } from './tstock.service';
import { CreateTstockDto } from './dto/create-tstock.dto';
import { UpdateTstockDto } from './dto/update-tstock.dto';

@Controller('tstock')
export class TstockController {
  constructor(private readonly tstockService: TstockService) {}

  @Post()
  create(@Body() createTstockDto: CreateTstockDto) {
    return this.tstockService.create(createTstockDto);
  }

  @Get()
  findAll() {
    return this.tstockService.findAll();
  }
  @Get('quantity/product')
  findQuantityByProductId() {
    return this.tstockService.findQuantityByProductId();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tstockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTstockDto: UpdateTstockDto) {
    return this.tstockService.update(+id, updateTstockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tstockService.remove(+id);
  }
}
