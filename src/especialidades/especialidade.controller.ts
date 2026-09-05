import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CriarEspecialidadeDto } from './dtos/criar-especialidade.dto'
import { CriarEspecialidadeUc } from './usecases/criar-especialidade.uc'
import { ListarEspecialidadesUc } from './usecases/listar-especialidades.uc'

@UseGuards(JwtAuthGuard)
@Controller('especialidades')
export class EspecialidadeController {
  constructor(
    private readonly criarEspecialidadeUc: CriarEspecialidadeUc,
    private readonly listarEspecialidadesUc: ListarEspecialidadesUc
  ) {}

  @Post()
  async criar(@Body() dto: CriarEspecialidadeDto) {
    return this.criarEspecialidadeUc.executar(dto)
  }

  @Get()
  async listar() {
    return this.listarEspecialidadesUc.executar()
  }
}