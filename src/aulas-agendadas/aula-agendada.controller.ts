import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CriarAulaDto } from './dtos/criar-aula.dto'
import { CriarAulaUc } from './usecases/criar-aula.uc'
import { GetAulaUc } from './usecases/get-aula.uc'
import { ListarAulasUc } from './usecases/listar-aulas.uc'

@UseGuards(JwtAuthGuard)
@Controller('aulas-agendadas')
export class AulaAgendadaController {
  constructor(
    private readonly criarAulaUc: CriarAulaUc,
    private readonly getAulaUc: GetAulaUc,
    private readonly listarAulasUc: ListarAulasUc
  ) {}

  @Post()
  async criar(@Body() dto: CriarAulaDto) {
    return this.criarAulaUc.executar(dto)
  }

  @Get()
  async listar() {
    return this.listarAulasUc.executar()
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    try {
      return await this.getAulaUc.executar(Number(id))
    } catch {
      throw new NotFoundException('Aula agendada não encontrada.')
    }
  }
}