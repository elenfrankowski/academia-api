import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common'

import { CriarAlunoDto } from './dtos/criar-aluno.dto'
import { CriarAlunoUc } from './usecases/criar-aluno.uc'
import { GetAlunoUc } from './usecases/get-aluno.uc'
import { ListarAlunosUc } from './usecases/listar-alunos.uc'

@Controller('alunos')
export class AlunoController {
  constructor(
    private readonly criarAlunoUc: CriarAlunoUc,
    private readonly getAlunoUc: GetAlunoUc,
    private readonly listarAlunosUc: ListarAlunosUc
  ) {}

  @Post()
  async criar(@Body() dto: CriarAlunoDto) {
    return this.criarAlunoUc.executar(dto)
  }

  @Get()
  async listar() {
    return this.listarAlunosUc.executar()
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    const aluno = await this.getAlunoUc.executar(Number(id))
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.')
    }
    return aluno
  }
}