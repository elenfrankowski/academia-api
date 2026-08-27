import { ConflictException, Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { ehTextoValido } from '../../@common/platform/utils/validator.utils'
import { Usuario } from '../../@common/entities/usuario.entity'
import { RegistrarDto } from '../dtos/registrar.dto'
import { UsuarioRepository } from '../repositories/usuario.repository'

const SALT_ROUNDS = 10

@Injectable()
export class RegistrarUc {
  constructor(@Inject('UsuarioRepository') private readonly repository: UsuarioRepository) {}

  async executar(dto: RegistrarDto): Promise<Omit<Usuario, 'senhaHash'>> {
    if (!ehTextoValido(dto.nome) || !ehTextoValido(dto.email) || !ehTextoValido(dto.senha)) {
      throw new Error('Os campos nome, email e senha são obrigatórios.')
    }

    const usuarioExistente = await this.repository.buscarPorEmail(dto.email)
    if (usuarioExistente) {
      throw new ConflictException('Já existe um usuário cadastrado com esse e-mail.')
    }

    const senhaHash = await bcrypt.hash(dto.senha, SALT_ROUNDS)
    const usuario = await this.repository.criar(dto.nome, dto.email, senhaHash)

    const { senhaHash: _senhaHash, ...usuarioSemSenha } = usuario
    return usuarioSemSenha
  }
}