import { Injectable } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class EstudianteService {

    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ){}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if (estudiante.cod.toString().length != 10){
            throw new BusinessLogicException("El codigo de estudiante no tiene 10 caracteres", BusinessError.PRECONDITION_FAILED);
        }
        return await this.estudianteRepository.save(estudiante);
    }

    async findEstudianteById(id: number): Promise<EstudianteEntity> {
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where: {id}, relations: ["proyecto"] } );
        if (!estudiante)
          throw new BusinessLogicException("The estudiante with the given id was not found", BusinessError.NOT_FOUND);
   
        return estudiante;
    }





    
}
