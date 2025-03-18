import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor) 
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  async create(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    const profesor = this.profesorRepository.create(createProfesorDto);
    return this.profesorRepository.save(profesor);
  }

  async findAll(): Promise<Profesor[]> {
    return this.profesorRepository.find();
  }

  async findOne(id: number): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({ where: { id } });
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }
    return profesor;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto): Promise<Profesor> {
    const profesor = await this.findOne(id); 
    Object.assign(profesor, updateProfesorDto);
    return this.profesorRepository.save(profesor);
  }

  async remove(id: number): Promise<string> {
    const profesor = await this.findOne(id); 
    await this.profesorRepository.remove(profesor);
    return `Profesor con ID ${id} eliminado correctamente`;
  }
}
