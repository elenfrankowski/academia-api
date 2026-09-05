import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { Instrutor } from '../../@common/entities/instrutor.entity'
import { Especialidade } from '../../especialidades/especialidade.entity'
import { InstrutorRepository } from './instrutor.repository'

@Injectable()
export class InstrutorTypeormRepository implements InstrutorRepository {
  constructor(
    @InjectRepository(Instrutor) private readonly repository: Repository<Instrutor>,
    @InjectRepository(Especialidade) private readonly especialidadeRepository: Repository<Especialidade>
  ) {}

  async criar(
    nome: string,
    especialidade: string,
    registro: string,
    especialidadeIds?: number[]
  ): Promise<Instrutor> {
    const especialidades = especialidadeIds?.length
      ? await this.especialidadeRepository.findBy({ id: In(especialidadeIds) })
      : []
    const novoInstrutor = this.repository.create({ nome, especialidade, registro, especialidades })
    return this.repository.save(novoInstrutor)
  }

  async buscarPorId(id: number): Promise<Instrutor | null> {
    return this.repository.findOne({ where: { id }, relations: { especialidades: true } })
  }

  async listarTodos(): Promise<Instrutor[]> {
    return this.repository.find({ relations: { especialidades: true } })
  }
}