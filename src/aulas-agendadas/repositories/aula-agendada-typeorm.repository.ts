import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Aluno } from '../../@common/entities/aluno.entity'
import { Instrutor } from '../../@common/entities/instrutor.entity'
import { AulaAgendada } from '../aula-agendada.entity'
import { AulaAgendadaRepository } from './aula-agendada.repository'

@Injectable()
export class AulaAgendadaTypeormRepository implements AulaAgendadaRepository {
  constructor(
    @InjectRepository(AulaAgendada) private readonly repository: Repository<AulaAgendada>,
    @InjectRepository(Aluno) private readonly alunoRepository: Repository<Aluno>,
    @InjectRepository(Instrutor) private readonly instrutorRepository: Repository<Instrutor>
  ) {}

  async criar(dataHora: Date, alunoId: number, instrutorId: number): Promise<AulaAgendada> {
    const aluno = await this.alunoRepository.findOneBy({ id: alunoId })
    const instrutor = await this.instrutorRepository.findOneBy({ id: instrutorId })
    if (!aluno || !instrutor) {
      throw new Error('Aluno ou instrutor informado não existe.')
    }
    const novaAula = this.repository.create({ dataHora, aluno, instrutor })
    return this.repository.save(novaAula)
  }

  async buscarPorId(id: number): Promise<AulaAgendada | null> {
    return this.repository.findOne({ where: { id }, relations: { aluno: true, instrutor: true } })
  }

  async listarTodas(): Promise<AulaAgendada[]> {
    return this.repository.find({ relations: { aluno: true, instrutor: true } })
  }
}