import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;
  let profesors: ProfesorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfesorService],
      imports: [...TypeOrmTestingConfig()]
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    profesors = [];
    for(let i = 0; i < 5; i++){
        const profesor: ProfesorEntity = await repository.save({

          cedula: faker.number.int(),
          nombre: faker.person.firstName(),
          grupoInv: faker.commerce.department(),
          numExt: faker.number.int(),

        })
        profesors.push(profesor);
    }
  }

  it('findProfesorById should return the profesor with the given id', async () => {
    const storedProfesor: ProfesorEntity = profesors[0];
    const profesor: ProfesorEntity = await service.findProfesorById(storedProfesor.id);
    expect(profesor).not.toBeNull();
    expect(profesor.nombre).toEqual(storedProfesor.nombre)
    expect(profesor.cedula).toEqual(storedProfesor.cedula)
    expect(profesor.grupoInv).toEqual(storedProfesor.grupoInv)
    expect(profesor.nombre).toEqual(storedProfesor.nombre)
    expect(profesor.numExt).toEqual(storedProfesor.numExt)
 
  })

  it('(positive case) create should return a new profesor', async () => {
    const profesor: ProfesorEntity = {
      id: 0,
      nombre: faker.person.firstName(),
      cedula: faker.number.int(10),
      numExt: faker.number.int(10),
      grupoInv: "TICSW",
      propuestas: [],
    }
 
    const newProfesor: ProfesorEntity = await service.crearProfesor(profesor);
    expect(newProfesor).not.toBeNull();
 
    const storedProfesor: ProfesorEntity = await repository.findOne({where: {id: newProfesor.id}})
    expect(storedProfesor).not.toBeNull();
    expect(storedProfesor.nombre).toEqual(newProfesor.nombre)
    expect(storedProfesor.numExt).toEqual(newProfesor.numExt)
    expect(storedProfesor.grupoInv).toEqual(newProfesor.grupoInv)
    expect(storedProfesor.cedula).toEqual(newProfesor.cedula)
  });

  it('(negative case) create should throw an exception error as the prof is not in any valid groupInv', async () => {
    const profesor: ProfesorEntity = {
      id: 0,
      nombre: faker.person.firstName(),
      cedula: faker.number.int(10),
      numExt: faker.number.int(10),
      grupoInv: "none",
      propuestas: [],
    }
 
    await expect(() => service.crearProfesor(profesor)).rejects.toHaveProperty("message", "The profesor is not in TICSW or IMAGINE or COMIT");
  });

  it('delete should remove a profesor given his id', async () => {
    const profesor: ProfesorEntity = profesors[0];
    profesor.propuestas = null
    await service.deleteProfesorById(profesor.id);
     const deletedProfesor: ProfesorEntity = await repository.findOne({ where: { id: profesor.id } })
    expect(deletedProfesor).toBeNull();
  });

  it('delete should remove a profesor given his cedula', async () => {
    const profesor: ProfesorEntity = profesors[0];
    profesor.propuestas = null
    await service.deleteProfesorByCedula(profesor.cedula);
     const deletedProfesor: ProfesorEntity = await repository.findOne({ where: { id: profesor.cedula } })
    expect(deletedProfesor).toBeNull();
  });




});
