import { Injectable } from '@nestjs/common';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectoService {

    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ){}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        return await this.proyectoRepository.save(proyecto);
    }

}
