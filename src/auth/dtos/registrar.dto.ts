import { RoleEnum } from '../../@common/enums/role.enum'

export interface RegistrarDto {
  nome: string
  email: string
  senha: string
  role?: RoleEnum
}