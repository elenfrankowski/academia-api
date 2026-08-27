import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Usuario } from '../../@common/entities/usuario.entity'
import { UsuarioRepository } from './usuario.repository'

@Injectable()
export class UsuarioTypeormRepository implements UsuarioRepository {
  constructor(@InjectRepository(Usuario) private readonly repository: Repository<Usuario>) {}

  async criar(nome: string, email: string, senhaHash: string): Promise<Usuario> {
    const novoUsuario = this.repository.create({ nome, email, senhaHash })
    return this.repository.save(novoUsuario)
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.repository.findOneBy({ email })
  }
}