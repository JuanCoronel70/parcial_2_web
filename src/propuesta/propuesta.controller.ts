import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { PropuestaDto } from './propuesta.dto/propuesta.dto';
import { plainToInstance } from 'class-transformer';

@Controller('propuestas')
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Get()
  async findAll(): Promise<PropuestaEntity[]> {
    return await this.propuestaService.findAllPropuesta();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PropuestaEntity> {
    return await this.propuestaService.findPropuestaById(Number(id));
  }

  @Post()
  async create(@Body(ValidationPipe) propuestaDto: PropuestaDto): Promise<PropuestaEntity> {
    const propuesta = plainToInstance(PropuestaEntity, propuestaDto);
    return await this.propuestaService.crearPropuesta(propuesta);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.propuestaService.deletePropuestaId(Number(id));
  }

}
