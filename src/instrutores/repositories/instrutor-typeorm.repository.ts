import { Repository } from 'typeorm'

import { Instrutor } from '../../@common/entities/instrutor.entity'
import { AppDataSource } from '../../@common/platform/database/typeorm/typeorm'
import { InstrutorRepository } from './instrutor.repository'

export class InstrutorTypeormRepository implements InstrutorRepository {
  private readonly repository: Repository<Instrutor> = AppDataSource.getRepository(Instrutor)

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