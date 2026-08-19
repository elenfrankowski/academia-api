import { Aluno } from '../../@common/entities/aluno.entity'
import { AlunoRepository } from '../repositories/aluno.repository'

export class GetAlunoUc {
  constructor(private readonly repository: AlunoRepository) {}

  async executar(id: number): Promise<Aluno> {
    const aluno = await this.repository.buscarPorId(id)
    if (!aluno) {
      throw new Error('Aluno não encontrado.')
    }
    return aluno
  }
}