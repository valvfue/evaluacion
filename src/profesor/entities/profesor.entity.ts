import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Disena } from '../../disena/entities/disena.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido1: string;

  @Column()
  apellido2: string;

  @OneToMany(() => Disena, (disena) => disena.profesor)
  disena: Disena[];
}

