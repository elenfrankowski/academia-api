import { Router } from 'express'

import { alunoRouter } from '../../../../alunos/aluno.router'
import { aulaAgendadaRouter } from '../../../../aulas-agendadas/aula-agendada.router'
import { instrutorRouter } from '../../../../instrutores/instrutor.router'

export const rootRouter = Router()

rootRouter.use('/alunos', alunoRouter)
rootRouter.use('/instrutores', instrutorRouter)
rootRouter.use('/aulas-agendadas', aulaAgendadaRouter)