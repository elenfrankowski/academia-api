import { Instrutor } from '../../@common/entities/instrutor.entity'

export interface InstrutorRepository {
  criar(nome: string, especialidade: string, registro: string): Promise<Instrutor>
  buscarPorId(id: number): Promise<Instrutor | null>
  listarTodos(): Promise<Instrutor[]>
}