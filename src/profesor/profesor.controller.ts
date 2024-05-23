import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { plainToInstance } from 'class-transformer';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProfesorEntity> {
    return await this.profesorService.findProfesorById(Number(id));
  }

  @Post()
  async create(@Body(ValidationPipe) profesorDto: ProfesorDto): Promise<ProfesorEntity> {
    const profesor = plainToInstance(ProfesorEntity, profesorDto);
    return await this.profesorService.crearProfesor(profesor);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    return await this.profesorService.deleteProfesorById(Number(id));
  }

  @Delete('cedula/:cedula')
  async deleteByCedula(@Param('cedula') cedula: string): Promise<void> {
    return await this.profesorService.deleteProfesorByCedula(Number(cedula));
  }
}
