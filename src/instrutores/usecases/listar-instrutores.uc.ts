import { Instrutor } from '../../@common/entities/instrutor.entity'
import { InstrutorRepository } from '../repositories/instrutor.repository'

export class ListarInstrutoresUc {
  constructor(private readonly repository: InstrutorRepository) {}

  async executar(): Promise<Instrutor[]> {
    return this.repository.listarTodos()
  }
}