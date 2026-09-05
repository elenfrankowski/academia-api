import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Aluno } from './@common/entities/aluno.entity'
import { Instrutor } from './@common/entities/instrutor.entity'
import { Usuario } from './@common/entities/usuario.entity'
import { SnakeCaseNamingPattern } from './@common/platform/database/typeorm/snake-case-naming-pattern'
import { AlunosModule } from './alunos/alunos.module'
import { AulaAgendada } from './aulas-agendadas/aula-agendada.entity'
import { AulasAgendadasModule } from './aulas-agendadas/aulas-agendadas.module'
import { AuthModule } from './auth/auth.module'
import { Especialidade } from './especialidades/especialidade.entity'
import { EspecialidadesModule } from './especialidades/especialidades.module'
import { InstrutoresModule } from './instrutores/instrutores.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5434),
      username: process.env.DB_USER ?? 'admin',
      password: process.env.DB_PASSWORD ?? 'admin123',
      database: process.env.DB_NAME ?? 'academia-db',
      synchronize: true,
      logging: true,
      namingStrategy: new SnakeCaseNamingPattern(),
      entities: [Aluno, Instrutor, AulaAgendada, Usuario, Especialidade]
    }),
    AlunosModule,
    InstrutoresModule,
    AulasAgendadasModule,
    AuthModule,
    EspecialidadesModule
  ]
})
export class AppModule {}