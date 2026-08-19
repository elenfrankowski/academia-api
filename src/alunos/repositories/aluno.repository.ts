import { Aluno } from '../../@common/entities/aluno.entity'

export interface AlunoRepository {
  criar(nome: string, plano: string): Promise<Aluno>
  buscarPorId(id: number): Promise<Aluno | null>
  listarTodos(): Promise<Aluno[]>
}