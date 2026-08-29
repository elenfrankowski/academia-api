import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Aluno } from '../../@common/entities/aluno.entity'
import { Instrutor } from '../../@common/entities/instrutor.entity'
import { AtualizarAlunoDto } from '../dtos/atualizar-aluno.dto'
import { AlunoRepository } from './aluno.repository'

@Injectable()
export class AlunoTypeormRepository implements AlunoRepository {
  constructor(
    @InjectRepository(Aluno) private readonly repository: Repository<Aluno>,
    @InjectRepository(Instrutor) private readonly instrutorRepository: Repository<Instrutor>
  ) {}

  async criar(nome: string, plano: string, instrutorId: number): Promise<Aluno> {
    const instrutor = await this.instrutorRepository.findOneBy({ id: instrutorId })
    if (!instrutor) {
      throw new NotFoundException('Instrutor informado não existe.')
    }
    const novoAluno = this.repository.create({ nome, plano, instrutor })
    return this.repository.save(novoAluno)
  }

  async buscarPorId(id: number): Promise<Aluno | null> {
    return this.repository.findOne({ where: { id }, relations: { instrutor: true } })
  }

  async listarTodos(): Promise<Aluno[]> {
    return this.repository.find({ relations: { instrutor: true } })
  }

  async atualizar(id: number, dto: AtualizarAlunoDto): Promise<Aluno | null> {
    const aluno = await this.buscarPorId(id)
    if (!aluno) {
      return null
    }

    if (dto.instrutorId) {
      const instrutor = await this.instrutorRepository.findOneBy({ id: dto.instrutorId })
      if (!instrutor) {
        throw new NotFoundException('Instrutor informado não existe.')
      }
      aluno.instrutor = instrutor
    }
    aluno.nome = dto.nome ?? aluno.nome
    aluno.plano = dto.plano ?? aluno.plano

    return this.repository.save(aluno)
  }

  async remover(id: number): Promise<boolean> {
    const resultado = await this.repository.delete(id)
    return (resultado.affected ?? 0) > 0
  }
}