import { Router } from 'express'

import { InstrutorController } from './instrutor.controller'

export const instrutorRouter = Router()
const controller = new InstrutorController()

instrutorRouter.get('/', (req, res) => void controller.listar(req, res))
instrutorRouter.get('/:id', (req, res) => void controller.buscarPorId(req, res))
instrutorRouter.post('/', (req, res) => void controller.criar(req, res))