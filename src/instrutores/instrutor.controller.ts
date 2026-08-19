import { Request, Response } from 'express'

import { InstrutorTypeormRepository } from './repositories/instrutor-typeorm.repository'
import { CriarInstrutorUc } from './usecases/criar-instrutor.uc'
import { GetInstrutorUc } from './usecases/get-instrutor.uc'
import { ListarInstrutoresUc } from './usecases/listar-instrutores.uc'

const repository = new InstrutorTypeormRepository()
const criarInstrutorUc = new CriarInstrutorUc(repository)
const getInstrutorUc = new GetInstrutorUc(repository)
const listarInstrutoresUc = new ListarInstrutoresUc(repository)

export class InstrutorController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const instrutor = await criarInstrutorUc.executar(req.body)
      res.status(201).json(instrutor)
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido.'
      res.status(400).json({ mensagem })
    }
  }

  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const instrutor = await getInstrutorUc.executar(Number(req.params.id))
      res.status(200).json(instrutor)
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido.'
      res.status(404).json({ mensagem })
    }
  }

  async listar(_req: Request, res: Response): Promise<void> {
    const instrutores = await listarInstrutoresUc.executar()
    res.status(200).json(instrutores)
  }
}