import { Inject, Injectable } from '@nestjs/common'

import { Instrutor } from '../../@common/entities/instrutor.entity'
import { InstrutorRepository } from '../repositories/instrutor.repository'

@Injectable()
export class ListarInstrutoresUc {
  constructor(@Inject('InstrutorRepository') private readonly repository: InstrutorRepository) {}

  async executar(): Promise<Instrutor[]> {
    return this.repository.listarTodos()
  }
}