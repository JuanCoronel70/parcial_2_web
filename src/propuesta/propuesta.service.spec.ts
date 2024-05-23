import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<PropuestaEntity>;
  let propuestas: PropuestaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropuestaService],
      imports: [...TypeOrmTestingConfig()]
    }).compile();

    repository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    service = module.get<PropuestaService>(PropuestaService);
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    propuestas = [];
    for(let i = 0; i < 5; i++){
        const propuesta: PropuestaEntity = await repository.save({
          titulo: faker.company.catchPhrase(),
          descripcion: faker.lorem.sentence(),
          clave: faker.internet.password()
        })
        propuestas.push(propuesta);
    }
  }

  it('findAllPropuesta should return all propuestas', async () => {
    const propuestasE: PropuestaEntity[] = await service.findAllPropuesta();
    expect(propuestasE).not.toBeNull();
    expect(propuestasE).toHaveLength(propuestas.length);
  });

  it('(positive case) create should return a new propuesta', async () => {
    const propuesta: PropuestaEntity = {
      id: 0,
      titulo: faker.company.buzzPhrase(),
      descripcion: faker.lorem.sentence(),
      clave: faker.internet.password(),
      proyecto: null,
      profesor: null
    }
 
    const newPropuesta: PropuestaEntity = await service.crearPropuesta(propuesta);
    expect(newPropuesta).not.toBeNull();
 
    const storedPropuesta: PropuestaEntity = await repository.findOne({where: {id: newPropuesta.id}})
    expect(storedPropuesta).not.toBeNull();
    expect(storedPropuesta.titulo).toEqual(newPropuesta.titulo)
    expect(storedPropuesta.descripcion).toEqual(newPropuesta.descripcion)
    expect(storedPropuesta.clave).toEqual(newPropuesta.clave)
  });

  it('(negative case) create should return a new exception as the title is empty', async () => {
    const propuesta: PropuestaEntity = {
      id: 0,
      titulo: "",
      descripcion: faker.lorem.sentence(),
      clave: faker.internet.password(),
      proyecto: null,
      profesor: null
    }
 
    await expect(() => service.crearPropuesta(propuesta)).rejects.toHaveProperty("message", "El titulo de la propuesta esta vacio")
  });

  it('findPropuestaById should return a propuesta by id', async () => {
    const storedPropuesta: PropuestaEntity = propuestas[0];
    const propuesta: PropuestaEntity = await service.findPropuestaById(storedPropuesta.id);
    expect(propuesta).not.toBeNull();
    expect(propuesta.titulo).toEqual(storedPropuesta.titulo)
    expect(propuesta.descripcion).toEqual(storedPropuesta.descripcion)
    expect(propuesta.clave).toEqual(storedPropuesta.clave)
  });

  it('delete should remove a propuesta', async () => {
    const propuesta: PropuestaEntity = propuestas[0];
    await service.deletePropuestaId(propuesta.id);
     const deletedPropuesta: PropuestaEntity = await repository.findOne({ where: { id: propuesta.id } })
    expect(deletedPropuesta).toBeNull();
  });

});
