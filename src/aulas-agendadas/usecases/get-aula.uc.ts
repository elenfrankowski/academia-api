import { AulaAgendada } from '../aula-agendada.entity'
import { AulaAgendadaRepository } from '../repositories/aula-agendada.repository'

export class GetAulaUc {
  constructor(private readonly repository: AulaAgendadaRepository) {}

  async executar(id: number): Promise<AulaAgendada> {
    const aula = await this.repository.buscarPorId(id)
    if (!aula) {
      throw new Error('Aula agendada não encontrada.')
    }
    return aula
  }
}