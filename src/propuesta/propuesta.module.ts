import { Module } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaController } from './propuesta.controller';

@Module({
  providers: [PropuestaService],
  imports: [TypeOrmModule.forFeature([PropuestaEntity])],
  controllers: [PropuestaController]
})
export class PropuestaModule {}
