import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Instrutor } from '../../@common/entities/instrutor.entity'
import { InstrutorRepository } from './instrutor.repository'

@Injectable()
export class InstrutorTypeormRepository implements InstrutorRepository {
  constructor(@InjectRepository(Instrutor) private readonly repository: Repository<Instrutor>) {}

  async criar(nome: string, especialidade: string, registro: string): Promise<Instrutor> {
    const novoInstrutor = this.repository.create({ nome, especialidade, registro })
    return this.repository.save(novoInstrutor)
  }

  async buscarPorId(id: number): Promise<Instrutor | null> {
    return this.repository.findOneBy({ id })
  }

  async listarTodos(): Promise<Instrutor[]> {
    return this.repository.find()
  }
}