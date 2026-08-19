import 'reflect-metadata'
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { Aluno } from '../../../entities/aluno.entity'
import { Instrutor } from '../../../entities/instrutor.entity'
import { AulaAgendada } from '../../../../aulas-agendadas/aula-agendada.entity'
import { SnakeCaseNamingPattern } from './snake-case-naming-pattern'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5434),
  username: process.env.DB_USER ?? 'admin',
  password: process.env.DB_PASSWORD ?? 'admin123',
  database: process.env.DB_NAME ?? 'academia-db',
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeCaseNamingPattern(),
  entities: [Aluno, Instrutor, AulaAgendada],
  migrations: ['src/@common/platform/database/typeorm/migrations/*.ts']
})