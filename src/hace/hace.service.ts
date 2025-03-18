import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hace } from './entities/hace.entity';
import { CreateHaceDto } from './dto/create-hace.dto';
import { UpdateHaceDto } from './dto/update-hace.dto';

@Injectable()
export class HaceService {
  constructor(
    @InjectRepository(Hace)
    private readonly haceRepository: Repository<Hace>,
  ) {}

  async create(createHaceDto: CreateHaceDto): Promise<Hace> {
    const hace = this.haceRepository.create(createHaceDto);
    return await this.haceRepository.save(hace);
  }

  async findAll(): Promise<Hace[]> {
    return await this.haceRepository.find();
  }

  async findOne(AlumnoId: number, ExamenTeoricoId: number): Promise<Hace> {
    const hace = await this.haceRepository.findOne({
      where: { AlumnoId, ExamenTeoricoId },
    });

    if (!hace) {
      throw new NotFoundException(
        `Resultado no encontrado (Alumno=${AlumnoId}, Examen=${ExamenTeoricoId})`,
      );
    }
    return hace;
  }

  async update(
    AlumnoId: number,
    ExamenTeoricoId: number,
    updateHaceDto: UpdateHaceDto,
  ): Promise<Hace> {
    const hace = await this.findOne(AlumnoId, ExamenTeoricoId);
    Object.assign(hace, updateHaceDto);
    return this.haceRepository.save(hace);
  }

  async remove(AlumnoId: number, ExamenTeoricoId: number): Promise<string> {
    const hace = await this.findOne(AlumnoId, ExamenTeoricoId); 
    await this.haceRepository.remove(hace);
    return `Resultado (Alumno=${AlumnoId}, Examen=${ExamenTeoricoId}) eliminado correctamente`;
  }
}
