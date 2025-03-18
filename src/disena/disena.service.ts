import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disena } from './entities/disena.entity';
import { CreateDisenaDto } from './dto/create-disena.dto';
import { UpdateDisenaDto } from './dto/update-disena.dto';

@Injectable()
export class DisenaService {
  constructor(
    @InjectRepository(Disena)
    private readonly disenaRepository: Repository<Disena>,
  ) {}

  async create(createDisenaDto: CreateDisenaDto): Promise<Disena> {
    const disena = this.disenaRepository.create(createDisenaDto);
    return await this.disenaRepository.save(disena);
  }

  async findAll(): Promise<Disena[]> {
    return await this.disenaRepository.find();
  }

  async findOne(
    ProfesorId: number,
    PracticaId: number,
    fecha: string,
  ): Promise<Disena> {
    const fechaConvertida = new Date(fecha);
    const disena = await this.disenaRepository.findOne({
      where: { ProfesorId, PracticaId, fecha: fechaConvertida },
    });

    if (!disena) {
      throw new NotFoundException(
        `Diseño no encontrado (Profesor=${ProfesorId}, Práctica=${PracticaId}, Fecha=${fecha})`,
      );
    }
    return disena;
  }

  async update(
    ProfesorId: number,
    PracticaId: number,
    fecha: string,
    updateDisenaDto: UpdateDisenaDto,
  ): Promise<Disena> {
    const disena = await this.findOne(ProfesorId, PracticaId, fecha); 
    Object.assign(disena, updateDisenaDto);
    return this.disenaRepository.save(disena);
  }

  async remove(
    ProfesorId: number,
    PracticaId: number,
    fecha: string,
  ): Promise<string> {
    const disena = await this.findOne(ProfesorId, PracticaId, fecha); 
    await this.disenaRepository.remove(disena);
    return `Diseño (Profesor=${ProfesorId}, Práctica=${PracticaId}, Fecha=${fecha}) eliminado correctamente`;
  }
}
