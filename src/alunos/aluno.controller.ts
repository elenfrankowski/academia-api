import { Request, Response } from 'express'

import { AlunoTypeormRepository } from './repositories/aluno-typeorm.repository'
import { CriarAlunoUc } from './usecases/criar-aluno.uc'
import { GetAlunoUc } from './usecases/get-aluno.uc'
import { ListarAlunosUc } from './usecases/listar-alunos.uc'

const repository = new AlunoTypeormRepository()
const criarAlunoUc = new CriarAlunoUc(repository)
const getAlunoUc = new GetAlunoUc(repository)
const listarAlunosUc = new ListarAlunosUc(repository)

export class AlunoController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const aluno = await criarAlunoUc.executar(req.body)
      res.status(201).json(aluno)
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido.'
      res.status(400).json({ mensagem })
    }
  }

  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const aluno = await getAlunoUc.executar(Number(req.params.id))
      res.status(200).json(aluno)
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido.'
      res.status(404).json({ mensagem })
    }
  }

  async listar(_req: Request, res: Response): Promise<void> {
    const alunos = await listarAlunosUc.executar()
    res.status(200).json(alunos)
  }
}