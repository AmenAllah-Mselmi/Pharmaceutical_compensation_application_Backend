import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParametreAppService } from './parametre_app.service';
import { CreateParametreAppDto } from './dto/create-parametre_app.dto';
import { UpdateParametreAppDto } from './dto/update-parametre_app.dto';

@Controller('parametre-app')
export class ParametreAppController {
  constructor(private readonly parametreAppService: ParametreAppService) {}

  @Post()
  create(@Body() createParametreAppDto: CreateParametreAppDto) {
    return this.parametreAppService.create(createParametreAppDto);
  }

  @Get()
  findAll() {
    return this.parametreAppService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parametreAppService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParametreAppDto: UpdateParametreAppDto) {
    return this.parametreAppService.update(+id, updateParametreAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parametreAppService.remove(+id);
  }
}
