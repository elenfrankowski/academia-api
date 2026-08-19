import { Router } from 'express'

import { AulaAgendadaController } from './aula-agendada.controller'

export const aulaAgendadaRouter = Router()
const controller = new AulaAgendadaController()

aulaAgendadaRouter.get('/', (req, res) => void controller.listar(req, res))
aulaAgendadaRouter.get('/:id', (req, res) => void controller.buscarPorId(req, res))
aulaAgendadaRouter.post('/', (req, res) => void controller.criar(req, res))