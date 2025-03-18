import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private readonly alumnoRepository: Repository<Alumno>,
  ) {}

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    const alumno = this.alumnoRepository.create(createAlumnoDto);
    return await this.alumnoRepository.save(alumno);
  }

  async findAll(): Promise<Alumno[]> {
    return await this.alumnoRepository.find();
  }

  async findOne(id: number): Promise<Alumno> {
    const alumno = await this.alumnoRepository.findOne({ where: { id } });
    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    }
    return alumno;
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    const alumno = await this.findOne(id); // Verificamos si existe
    Object.assign(alumno, updateAlumnoDto);
    return this.alumnoRepository.save(alumno);
  }

  async remove(id: number): Promise<string> {
    const alumno = await this.findOne(id); // Verificamos si existe
    await this.alumnoRepository.remove(alumno);
    return `Alumno con ID ${id} eliminado correctamente`;
  }
}

