import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Aluno } from '../../@common/entities/aluno.entity'
import { AlunoRepository } from './aluno.repository'

@Injectable()
export class AlunoTypeormRepository implements AlunoRepository {
  constructor(@InjectRepository(Aluno) private readonly repository: Repository<Aluno>) {}

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