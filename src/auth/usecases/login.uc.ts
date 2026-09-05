import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { ehTextoValido } from '../../@common/platform/utils/validator.utils'
import { LoginDto } from '../dtos/login.dto'
import { UsuarioRepository } from '../repositories/usuario.repository'

@Injectable()
export class LoginUc {
  constructor(
    @Inject('UsuarioRepository') private readonly repository: UsuarioRepository,
    private readonly jwtService: JwtService
  ) {}

  async executar(dto: LoginDto): Promise<{ accessToken: string }> {
    if (!ehTextoValido(dto.email) || !ehTextoValido(dto.senha)) {
      throw new UnauthorizedException('E-mail e senha são obrigatórios.')
    }

    const usuario = await this.repository.buscarPorEmail(dto.email)
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas.')
    }

    const senhaConfere = await bcrypt.compare(dto.senha, usuario.senhaHash)
    if (!senhaConfere) {
      throw new UnauthorizedException('Credenciais inválidas.')
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role,
      iss: process.env.JWT_ISSUER ?? 'academia-api'
    }
    const accessToken = await this.jwtService.signAsync(payload)
    return { accessToken }
  }
}