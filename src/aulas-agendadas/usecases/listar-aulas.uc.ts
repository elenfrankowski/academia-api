import { AulaAgendada } from '../aula-agendada.entity'
import { AulaAgendadaRepository } from '../repositories/aula-agendada.repository'

export class ListarAulasUc {
  constructor(private readonly repository: AulaAgendadaRepository) {}

  async executar(): Promise<AulaAgendada[]> {
    return this.repository.listarTodas()
  }
}