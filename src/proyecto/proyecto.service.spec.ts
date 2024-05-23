import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;
  let proyectosList: ProyectoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectoService],
      imports: [...TypeOrmTestingConfig()]
    }).compile();

    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    service = module.get<ProyectoService>(ProyectoService);
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    proyectosList = [];
    for(let i = 0; i < 5; i++){
        const proyecto: ProyectoEntity = await repository.save({
        fechaInicio: faker.date.recent(),
        fechaFin: faker.date.future(),
        url: faker.internet.url(),
       })
        proyectosList.push(proyecto);
    }
  }

  it('(positive case) create should return a new proyecto', async () => {
    const proyecto: ProyectoEntity = {
      id: 0,
      fechaInicio: faker.date.recent(),
      fechaFin: faker.date.future(),
      url: faker.internet.url(),
      estudiante: null,
      propuesta: null

    }
 
    const newProyecto: ProyectoEntity = await service.crearProyecto(proyecto);
    expect(newProyecto).not.toBeNull();
 
    const storedProyecto: ProyectoEntity = await repository.findOne({where: {id: newProyecto.id}})
    expect(storedProyecto).not.toBeNull();
    expect(storedProyecto.fechaInicio).toEqual(newProyecto.fechaInicio)
    expect(storedProyecto.fechaFin).toEqual(newProyecto.fechaFin)
    expect(storedProyecto.url).toEqual(newProyecto.url)
  });

  it('(negative case) create should return a exception as the fechaInicio is bigger than fechaFin', async () => {
    const proyecto: ProyectoEntity = {
      id: 0,
      fechaInicio: faker.date.future(),
      fechaFin: faker.date.recent(),
      url: faker.internet.url(),
      estudiante: null,
      propuesta: null

    }
 
    await expect(() => service.crearProyecto(proyecto)).rejects.toHaveProperty("message", "La fecha fin es menor a la fecha de inicio")

  });


});
