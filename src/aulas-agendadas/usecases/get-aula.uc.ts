import { Inject, Injectable } from '@nestjs/common'

import { AulaAgendada } from '../aula-agendada.entity'
import { AulaAgendadaRepository } from '../repositories/aula-agendada.repository'

@Injectable()
export class GetAulaUc {
  constructor(@Inject('AulaAgendadaRepository') private readonly repository: AulaAgendadaRepository) {}

  async executar(id: number): Promise<AulaAgendada> {
    const aula = await this.repository.buscarPorId(id)
    if (!aula) {
      throw new Error('Aula agendada não encontrada.')
    }
    return aula
  }
}