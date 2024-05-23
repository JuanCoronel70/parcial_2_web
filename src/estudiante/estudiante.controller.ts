import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { plainToInstance } from 'class-transformer';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EstudianteEntity> {
    return await this.estudianteService.findEstudianteById(Number(id));
  }

  @Post()
  async create(@Body(ValidationPipe) estudianteDto: EstudianteDto): Promise<EstudianteEntity> {
    const estudiante = plainToInstance(EstudianteEntity, estudianteDto);
    return await this.estudianteService.crearEstudiante(estudiante);
  }
}
