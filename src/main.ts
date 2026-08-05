import express from 'express'

import { AppDataSource } from './database/data-source'
import { alunoRoutes } from './routes/aluno.routes'
import { aulaAgendadaRoutes } from './routes/aula-agendada.routes'
import { instrutorRoutes } from './routes/instrutor.routes'

async function iniciar() {
  await AppDataSource.initialize()
  console.log('Conectado ao banco de dados com sucesso!')

  const app = express()
  app.use(express.json())

  app.use('/alunos', alunoRoutes)
  app.use('/instrutores', instrutorRoutes)
  app.use('/aulas-agendadas', aulaAgendadaRoutes)

  const PORTA = 3000
  app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${String(PORTA)}`)
  })
}

void iniciar()