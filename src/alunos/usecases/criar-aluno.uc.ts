import { ehTextoValido } from '../../@common/platform/utils/validator.utils'
import { Aluno } from '../../@common/entities/aluno.entity'
import { CriarAlunoDto } from '../dtos/criar-aluno.dto'
import { AlunoRepository } from '../repositories/aluno.repository'

export class CriarAlunoUc {
  constructor(private readonly repository: AlunoRepository) {}

  async executar(dto: CriarAlunoDto): Promise<Aluno> {
    if (!ehTextoValido(dto.nome) || !ehTextoValido(dto.plano)) {
      throw new Error('Os campos nome e plano são obrigatórios.')
    }
    return this.repository.criar(dto.nome, dto.plano)
  }
}