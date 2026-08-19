import { Repository } from 'typeorm'

import { Aluno } from '../../@common/entities/aluno.entity'
import { AppDataSource } from '../../@common/platform/database/typeorm/typeorm'
import { AlunoRepository } from './aluno.repository'

export class AlunoTypeormRepository implements AlunoRepository {
  private readonly repository: Repository<Aluno> = AppDataSource.getRepository(Aluno)

  async criar(nome: string, plano: string): Promise<Aluno> {
    const novoAluno = this.repository.create({ nome, plano })
    return this.repository.save(novoAluno)
  }

  async buscarPorId(id: number): Promise<Aluno | null> {
    return this.repository.findOneBy({ id })
  }

  async listarTodos(): Promise<Aluno[]> {
    return this.repository.find()
  }
}