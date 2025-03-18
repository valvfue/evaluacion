import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disena } from './entities/disena.entity';
import { Profesor } from '../profesor/entities/profesor.entity';
import { Practica } from '../practica/entities/practica.entity';
import { DisenaService } from './disena.service';
import { DisenaController } from './disena.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Disena, Profesor, Practica])],
  controllers: [DisenaController],
  providers: [DisenaService],
})
export class DisenaModule {}

