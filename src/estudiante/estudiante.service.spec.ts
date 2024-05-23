import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudiantesList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    await repository.clear();
    estudiantesList = [];

    for (let i = 0; i < 5; i++) {
      const estudiante: EstudianteEntity = await repository.save({
        nombre: faker.person.firstName() + ' ' + faker.person.lastName(),
        cod: faker.string.numeric({length: 10}),
        cred: faker.number.int({ min: 1, max: 100 }), 
      });
      estudiantesList.push(estudiante);
    }
  };

  describe('crearEstudiante', () => {
    it('should create a new estudiante (positive case)', async () => {
      const estudianteDto = {
        nombre: faker.person.firstName() + ' ' + faker.person.lastName(),
        cod: faker.string.numeric({length: 10}),
        cred: faker.number.int({ min: 1, max: 100 }),
        proyecto: null
      };
      const result = await service.crearEstudiante(estudianteDto as EstudianteEntity);
      expect(result).toEqual(expect.objectContaining(estudianteDto));
    });

    it('should throw an error if cod length is not 10 (negative case)', async () => {
      const estudianteDto = {
        nombre: faker.person.firstName() + ' ' + faker.person.lastName(),
        cod: faker.string.numeric({length: 9}), // Código con longitud incorrecta
        cred: faker.number.int({ min: 1, max: 100 }),
        proyecto: null
      };
      await expect(service.crearEstudiante(estudianteDto as EstudianteEntity)).rejects.toHaveProperty("message", "El codigo de estudiante no tiene 10 caracteres");
    });
  });

  describe('findEstudianteById', () => {
    it('should return a estudiante by id (positive case)', async () => {
      const storedEstudiante = estudiantesList[0];
      storedEstudiante.proyecto = null;
      const result = await service.findEstudianteById(storedEstudiante.id);
      expect(result).toEqual(storedEstudiante);
    });

    it('should throw an error if estudiante is not found (negative case)', async () => {
      await expect(service.findEstudianteById(99999)).rejects.toHaveProperty("message", "The estudiante with the given id was not found"); 
    });
  });
});
