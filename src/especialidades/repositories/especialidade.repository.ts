import { Especialidade } from '../especialidade.entity'

export interface EspecialidadeRepository {
  criar(nome: string): Promise<Especialidade>
  listarTodas(): Promise<Especialidade[]>
  buscarPorIds(ids: number[]): Promise<Especialidade[]>
}