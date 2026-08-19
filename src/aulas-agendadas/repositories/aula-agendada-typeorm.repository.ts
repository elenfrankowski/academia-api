import { Repository } from 'typeorm'

import { Aluno } from '../../@common/entities/aluno.entity'
import { Instrutor } from '../../@common/entities/instrutor.entity'
import { AppDataSource } from '../../@common/platform/database/typeorm/typeorm'
import { AulaAgendada } from '../aula-agendada.entity'
import { AulaAgendadaRepository } from './aula-agendada.repository'

export class AulaAgendadaTypeormRepository implements AulaAgendadaRepository {
  private readonly repository: Repository<AulaAgendada> = AppDataSource.getRepository(AulaAgendada)
  private readonly alunoRepository: Repository<Aluno> = AppDataSource.getRepository(Aluno)
  private readonly instrutorRepository: Repository<Instrutor> = AppDataSource.getRepository(Instrutor)

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