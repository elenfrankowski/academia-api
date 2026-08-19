import { AulaAgendada } from '../aula-agendada.entity'

export interface AulaAgendadaRepository {
  criar(dataHora: Date, alunoId: number, instrutorId: number): Promise<AulaAgendada>
  buscarPorId(id: number): Promise<AulaAgendada | null>
  listarTodas(): Promise<AulaAgendada[]>
}