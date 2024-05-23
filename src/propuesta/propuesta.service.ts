import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ){}

    async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        return await this.propuestaRepository.save(propuesta);
    }

    async findPropuestaById(id: number): Promise<PropuestaEntity> {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id}, relations: ["proyecto", "profesor"] } );
        if (!propuesta)
          throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
   
        return propuesta;
    }

    async findAllPropuesta(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({ relations: ["proyecto", "profesor"] });
    }

    async deletePropuestaId(id: number) {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where:{id}});
        if (!propuesta)
          throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
        
        //TODO: Handle elimination if not proyects associated
        await this.propuestaRepository.remove(propuesta);
    }

}
