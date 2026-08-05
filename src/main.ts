import { AppDataSource } from './database/data-source'

async function iniciar() {
  await AppDataSource.initialize()
  console.log('Conectado ao banco de dados com sucesso!')
}

void iniciar()