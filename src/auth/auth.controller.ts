import { Body, Controller, Post } from '@nestjs/common'

import { LoginDto } from './dtos/login.dto'
import { RegistrarDto } from './dtos/registrar.dto'
import { LoginUc } from './usecases/login.uc'
import { RegistrarUc } from './usecases/registrar.uc'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registrarUc: RegistrarUc,
    private readonly loginUc: LoginUc
  ) {}

  @Post('registrar')
  async registrar(@Body() dto: RegistrarDto) {
    return this.registrarUc.executar(dto)
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUc.executar(dto)
  }
}