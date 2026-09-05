import { PlanoEnum } from '../../@common/enums/plano.enum'

export interface CriarAlunoDto {
  nome: string
  plano: PlanoEnum
  instrutorId: number
}