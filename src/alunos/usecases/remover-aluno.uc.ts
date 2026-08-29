import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { AlunoRepository } from '../repositories/aluno.repository'

@Injectable()
export class RemoverAlunoUc {
  constructor(@Inject('AlunoRepository') private readonly repository: AlunoRepository) {}

  async executar(id: number): Promise<void> {
    const removido = await this.repository.remover(id)
    if (!removido) {
      throw new NotFoundException('Aluno não encontrado para remoção.')
    }
  }
}