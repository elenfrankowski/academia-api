import { Usuario } from '../../@common/entities/usuario.entity'

export interface UsuarioRepository {
  criar(nome: string, email: string, senhaHash: string): Promise<Usuario>
  buscarPorEmail(email: string): Promise<Usuario | null>
}