import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProyectoService],
  imports: [TypeOrmModule.forFeature([ProyectoEntity])]
})
export class ProyectoModule {}
