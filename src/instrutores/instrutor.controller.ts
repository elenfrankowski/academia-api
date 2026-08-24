import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common'

import { CriarInstrutorDto } from './dtos/criar-instrutor.dto'
import { CriarInstrutorUc } from './usecases/criar-instrutor.uc'
import { GetInstrutorUc } from './usecases/get-instrutor.uc'
import { ListarInstrutoresUc } from './usecases/listar-instrutores.uc'

@Controller('instrutores')
export class InstrutorController {
  constructor(
    private readonly criarInstrutorUc: CriarInstrutorUc,
    private readonly getInstrutorUc: GetInstrutorUc,
    private readonly listarInstrutoresUc: ListarInstrutoresUc
  ) {}

  @Post()
  async criar(@Body() dto: CriarInstrutorDto) {
    return this.criarInstrutorUc.executar(dto)
  }

  @Get()
  async listar() {
    return this.listarInstrutoresUc.executar()
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    try {
      return await this.getInstrutorUc.executar(Number(id))
    } catch {
      throw new NotFoundException('Instrutor não encontrado.')
    }
  }
}