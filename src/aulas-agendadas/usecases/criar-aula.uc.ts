import { ehDataValida, ehNumeroValido } from '../../@common/platform/utils/validator.utils'
import { AulaAgendada } from '../aula-agendada.entity'
import { CriarAulaDto } from '../dtos/criar-aula.dto'
import { AulaAgendadaRepository } from '../repositories/aula-agendada.repository'

export class CriarAulaUc {
  constructor(private readonly repository: AulaAgendadaRepository) {}

  async executar(dto: CriarAulaDto): Promise<AulaAgendada> {
    if (!ehDataValida(dto.dataHora)) {
      throw new Error('dataHora inválida.')
    }
    if (!ehNumeroValido(dto.alunoId) || !ehNumeroValido(dto.instrutorId)) {
      throw new Error('alunoId e instrutorId são obrigatórios e devem ser válidos.')
    }
    return this.repository.criar(new Date(dto.dataHora), dto.alunoId, dto.instrutorId)
  }
}