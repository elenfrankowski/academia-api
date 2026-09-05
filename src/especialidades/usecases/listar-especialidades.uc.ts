import { Inject, Injectable } from '@nestjs/common'

import { Especialidade } from '../especialidade.entity'
import { EspecialidadeRepository } from '../repositories/especialidade.repository'

@Injectable()
export class ListarEspecialidadesUc {
  constructor(@Inject('EspecialidadeRepository') private readonly repository: EspecialidadeRepository) {}

  async executar(): Promise<Especialidade[]> {
    return this.repository.listarTodas()
  }
}