import { Inject, Injectable } from '@nestjs/common'

import { ehTextoValido } from '../../@common/platform/utils/validator.utils'
import { Instrutor } from '../../@common/entities/instrutor.entity'
import { CriarInstrutorDto } from '../dtos/criar-instrutor.dto'
import { InstrutorRepository } from '../repositories/instrutor.repository'

@Injectable()
export class CriarInstrutorUc {
  constructor(@Inject('InstrutorRepository') private readonly repository: InstrutorRepository) {}

  async executar(dto: CriarInstrutorDto): Promise<Instrutor> {
    if (!ehTextoValido(dto.nome) || !ehTextoValido(dto.especialidade) || !ehTextoValido(dto.registro)) {
      throw new Error('Os campos nome, especialidade e registro são obrigatórios.')
    }
    return this.repository.criar(dto.nome, dto.especialidade, dto.registro)
  }
}