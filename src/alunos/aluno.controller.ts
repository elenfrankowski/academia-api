import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { AtualizarAlunoDto } from './dtos/atualizar-aluno.dto'
import { CriarAlunoDto } from './dtos/criar-aluno.dto'
import { AtualizarAlunoUc } from './usecases/atualizar-aluno.uc'
import { CriarAlunoUc } from './usecases/criar-aluno.uc'
import { GetAlunoUc } from './usecases/get-aluno.uc'
import { ListarAlunosUc } from './usecases/listar-alunos.uc'
import { RemoverAlunoUc } from './usecases/remover-aluno.uc'

@UseGuards(JwtAuthGuard)
@Controller('alunos')
export class AlunoController {
  constructor(
    private readonly criarAlunoUc: CriarAlunoUc,
    private readonly getAlunoUc: GetAlunoUc,
    private readonly listarAlunosUc: ListarAlunosUc,
    private readonly atualizarAlunoUc: AtualizarAlunoUc,
    private readonly removerAlunoUc: RemoverAlunoUc
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

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() dto: AtualizarAlunoDto) {
    return this.atualizarAlunoUc.executar(Number(id), dto)
  }

  @Delete(':id')
  @HttpCode(204)
  async remover(@Param('id') id: string) {
    await this.removerAlunoUc.executar(Number(id))
  }
}