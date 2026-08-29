import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { Aluno } from '../../@common/entities/aluno.entity'
import { AtualizarAlunoDto } from '../dtos/atualizar-aluno.dto'
import { AlunoRepository } from '../repositories/aluno.repository'

@Injectable()
export class AtualizarAlunoUc {
  constructor(@Inject('AlunoRepository') private readonly repository: AlunoRepository) {}

  async executar(id: number, dto: AtualizarAlunoDto): Promise<Aluno> {
    const alunoAtualizado = await this.repository.atualizar(id, dto)
    if (!alunoAtualizado) {
      throw new NotFoundException('Aluno não encontrado para atualização.')
    }
    return alunoAtualizado
  }
}