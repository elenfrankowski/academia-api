import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { Especialidade } from '../especialidade.entity'
import { EspecialidadeRepository } from './especialidade.repository'

@Injectable()
export class EspecialidadeTypeormRepository implements EspecialidadeRepository {
  constructor(@InjectRepository(Especialidade) private readonly repository: Repository<Especialidade>) {}

  async criar(nome: string): Promise<Especialidade> {
    const nova = this.repository.create({ nome })
    return this.repository.save(nova)
  }

  async listarTodas(): Promise<Especialidade[]> {
    return this.repository.find()
  }

  async buscarPorIds(ids: number[]): Promise<Especialidade[]> {
    return this.repository.findBy({ id: In(ids) })
  }
}