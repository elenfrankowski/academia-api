import { Inject, Injectable } from '@nestjs/common'

import { Instrutor } from '../../@common/entities/instrutor.entity'
import { InstrutorRepository } from '../repositories/instrutor.repository'

@Injectable()
export class GetInstrutorUc {
  constructor(@Inject('InstrutorRepository') private readonly repository: InstrutorRepository) {}

  async executar(id: number): Promise<Instrutor> {
    const instrutor = await this.repository.buscarPorId(id)
    if (!instrutor) {
      throw new Error('Instrutor não encontrado.')
    }
    return instrutor
  }
}