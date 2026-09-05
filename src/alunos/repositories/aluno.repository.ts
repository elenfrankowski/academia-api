import { Aluno } from '../../@common/entities/aluno.entity'
import { AtualizarAlunoDto } from '../dtos/atualizar-aluno.dto'
import { PlanoEnum } from '../../@common/enums/plano.enum'

export interface AlunoRepository {
  criar(nome: string, plano: PlanoEnum, instrutorId: number): Promise<Aluno>
  buscarPorId(id: number): Promise<Aluno | null>
  listarTodos(): Promise<Aluno[]>
  atualizar(id: number, dto: AtualizarAlunoDto): Promise<Aluno | null>
  remover(id: number): Promise<boolean>
}