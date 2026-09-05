import { Inject, Injectable } from '@nestjs/common'

import { Aluno } from '../../@common/entities/aluno.entity'
import { PlanoEnum } from '../../@common/enums/plano.enum'
import { ehNumeroValido, ehTextoValido } from '../../@common/platform/utils/validator.utils'
import { CriarAlunoDto } from '../dtos/criar-aluno.dto'
import { AlunoRepository } from '../repositories/aluno.repository'

@Injectable()
export class CriarAlunoUc {
  constructor(@Inject('AlunoRepository') private readonly repository: AlunoRepository) {}

  async executar(dto: CriarAlunoDto): Promise<Aluno> {
    if (!ehTextoValido(dto.nome)) {
      throw new Error('O campo nome é obrigatório.')
    }
    if (!Object.values(PlanoEnum).includes(dto.plano)) {
      throw new Error(`O campo plano deve ser um dos seguintes valores: ${Object.values(PlanoEnum).join(', ')}.`)
    }
    if (!ehNumeroValido(dto.instrutorId)) {
      throw new Error('O campo instrutorId é obrigatório e deve ser válido.')
    }
    return this.repository.criar(dto.nome, dto.plano, dto.instrutorId)
  }
}