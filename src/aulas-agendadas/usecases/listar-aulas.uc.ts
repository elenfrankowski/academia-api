import { Inject, Injectable } from '@nestjs/common'

import { AulaAgendada } from '../aula-agendada.entity'
import { AulaAgendadaRepository } from '../repositories/aula-agendada.repository'

@Injectable()
export class ListarAulasUc {
  constructor(@Inject('AulaAgendadaRepository') private readonly repository: AulaAgendadaRepository) {}

  async executar(): Promise<AulaAgendada[]> {
    return this.repository.listarTodas()
  }
}