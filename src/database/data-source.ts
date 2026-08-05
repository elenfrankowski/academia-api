import 'reflect-metadata'
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

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
  entities: ['src/entities/*.ts']
})