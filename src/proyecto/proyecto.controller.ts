import { Body, Controller, Post } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationPipe } from '@nestjs/common';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}


  @Post()
  async create(@Body(ValidationPipe) proyectoDto: ProyectoDto): Promise<ProyectoEntity> {
    const proyecto = plainToInstance(ProyectoEntity, proyectoDto);
    return await this.proyectoService.crearProyecto(proyecto);
  }

}
