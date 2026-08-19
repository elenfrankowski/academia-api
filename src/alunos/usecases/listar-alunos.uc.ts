import { Aluno } from '../../@common/entities/aluno.entity'
import { AlunoRepository } from '../repositories/aluno.repository'

export class ListarAlunosUc {
  constructor(private readonly repository: AlunoRepository) {}

  async executar(): Promise<Aluno[]> {
    return this.repository.listarTodos()
  }
}