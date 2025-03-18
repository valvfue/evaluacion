import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Profesor } from '../../profesor/entities/profesor.entity';
import { Practica } from '../../practica/entities/practica.entity';

@Entity()
export class Disena {
  @PrimaryColumn()
  ProfesorId: number;

  @PrimaryColumn()
  PracticaId: number;

  @PrimaryColumn()
  fecha: Date;

  @ManyToOne(() => Profesor, (profesor) => profesor.disena)
  @JoinColumn({ name: 'ProfesorId' })
  profesor: Profesor;

  @ManyToOne(() => Practica, (practica) => practica.disena)
  @JoinColumn({ name: 'PracticaId' })
  practica: Practica;
}

