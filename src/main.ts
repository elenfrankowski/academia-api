import express from 'express'

import { AppDataSource } from './@common/platform/database/typeorm/typeorm'
import { rootRouter } from './@common/platform/express/routers/root.router'

async function iniciar() {
  await AppDataSource.initialize()
  console.log('Conectado ao banco de dados com sucesso!')

  const app = express()
  app.use(express.json())
  app.use(rootRouter)

  const PORTA = 3000
  app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${String(PORTA)}`)
  })
}

void iniciar()