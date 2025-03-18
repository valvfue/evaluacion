import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Practica } from './entities/practica.entity';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';

@Injectable()
export class PracticaService {
  constructor(
    @InjectRepository(Practica)
    private readonly practicaRepository: Repository<Practica>,
  ) {}

  async create(createPracticaDto: CreatePracticaDto): Promise<Practica> {
    const practica = this.practicaRepository.create(createPracticaDto);
    return await this.practicaRepository.save(practica);
  }

  async findAll(): Promise<Practica[]> {
    return await this.practicaRepository.find();
  }

  async findOne(id: number): Promise<Practica> {
    const practica = await this.practicaRepository.findOne({ where: { id } });
    if (!practica) {
      throw new NotFoundException(`Práctica con ID ${id} no encontrada`);
    }
    return practica;
  }

  async update(id: number, updatePracticaDto: UpdatePracticaDto): Promise<Practica> {
    const practica = await this.findOne(id); // Verificamos si existe
    Object.assign(practica, updatePracticaDto);
    return this.practicaRepository.save(practica);
  }

  async remove(id: number): Promise<string> {
    const practica = await this.findOne(id); // Verificamos si existe
    await this.practicaRepository.remove(practica);
    return `Práctica con ID ${id} eliminada correctamente`;
  }
}


