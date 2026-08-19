import { Router } from 'express'

import { AlunoController } from './aluno.controller'

export const alunoRouter = Router()
const controller = new AlunoController()

alunoRouter.get('/', (req, res) => void controller.listar(req, res))
alunoRouter.get('/:id', (req, res) => void controller.buscarPorId(req, res))
alunoRouter.post('/', (req, res) => void controller.criar(req, res))