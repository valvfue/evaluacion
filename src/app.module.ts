import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoModule } from './alumno/alumno.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PracticaModule } from './practica/practica.module';
import { ExamenteoricoModule } from './examenteorico/examenteorico.module';
import { HaceModule } from './hace/hace.module';
import { RealizaModule } from './realiza/realiza.module';
import { DisenaModule } from './disena/disena.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'victor',
      password: 'victor', 
      database: 'evaluacion_db', 
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    AlumnoModule,
    ProfesorModule,
    PracticaModule,
    ExamenteoricoModule,
    HaceModule,
    RealizaModule,
    DisenaModule,
  ],
})
export class AppModule {}







