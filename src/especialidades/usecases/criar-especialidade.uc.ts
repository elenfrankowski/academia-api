import { Inject, Injectable } from '@nestjs/common'

import { ehTextoValido } from '../../@common/platform/utils/validator.utils'
import { CriarEspecialidadeDto } from '../dtos/criar-especialidade.dto'
import { Especialidade } from '../especialidade.entity'
import { EspecialidadeRepository } from '../repositories/especialidade.repository'

@Injectable()
export class CriarEspecialidadeUc {
  constructor(@Inject('EspecialidadeRepository') private readonly repository: EspecialidadeRepository) {}

  async executar(dto: CriarEspecialidadeDto): Promise<Especialidade> {
    if (!ehTextoValido(dto.nome)) {
      throw new Error('O campo nome é obrigatório.')
    }
    return this.repository.criar(dto.nome)
  }
}