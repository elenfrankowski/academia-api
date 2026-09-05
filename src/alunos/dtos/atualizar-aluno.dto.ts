import { PlanoEnum } from '../../@common/enums/plano.enum'

export interface AtualizarAlunoDto {
  nome?: string
  plano?: PlanoEnum
  instrutorId?: number
}