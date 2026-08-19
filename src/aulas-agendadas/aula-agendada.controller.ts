import { Request, Response } from 'express'

import { AulaAgendadaTypeormRepository } from './repositories/aula-agendada-typeorm.repository'
import { CriarAulaUc } from './usecases/criar-aula.uc'
import { GetAulaUc } from './usecases/get-aula.uc'
import { ListarAulasUc } from './usecases/listar-aulas.uc'

const repository = new AulaAgendadaTypeormRepository()
const criarAulaUc = new CriarAulaUc(repository)
const getAulaUc = new GetAulaUc(repository)
const listarAulasUc = new ListarAulasUc(repository)

export class AulaAgendadaController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const aula = await criarAulaUc.executar(req.body)
      res.status(201).json(aula)
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido.'
      res.status(400).json({ mensagem })
    }
  }

  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const aula = await getAulaUc.executar(Number(req.params.id))
      res.status(200).json(aula)
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido.'
      res.status(404).json({ mensagem })
    }
  }

  async listar(_req: Request, res: Response): Promise<void> {
    const aulas = await listarAulasUc.executar()
    res.status(200).json(aulas)
  }
}