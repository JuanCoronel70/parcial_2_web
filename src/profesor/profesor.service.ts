import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class ProfesorService {

    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ){}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        if (profesor.grupoInv.toString() != "TICSW" ){
          if (profesor.grupoInv.toString() != "IMAGINE"){
            if (profesor.grupoInv.toString() != "COMIT"){
              throw new BusinessLogicException("The profesor is not in TICSW or IMAGINE or COMIT", BusinessError.PRECONDITION_FAILED);
            }
          }
        }
        return await this.profesorRepository.save(profesor);
    }

    async findProfesorById(id: number): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: ["propuestas"] } );
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
   
        return profesor;
    }

    async delteProfesorById(id: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{id}});
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);

        profesor.propuestas.forEach(propuesta => {
          if (propuesta.proyecto) {
            throw new BusinessLogicException("El profesor tiene propuestas con proyectos asociados", BusinessError.PRECONDITION_FAILED);
          }
        });
        
        await this.profesorRepository.remove(profesor);
    }

    async deleteProfesorByCedula(cedula: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{cedula}});
        if (!profesor)
          throw new BusinessLogicException("The profesor with the given cedula was not found", BusinessError.NOT_FOUND);
        
        profesor.propuestas.forEach(propuesta => {
          if (propuesta.proyecto) {
            throw new BusinessLogicException("El profesor tiene propuestas con proyectos asociados", BusinessError.PRECONDITION_FAILED);
          }
        });

        await this.profesorRepository.remove(profesor);
    }
    
}
