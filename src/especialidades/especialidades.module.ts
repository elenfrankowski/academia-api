import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EspecialidadeController } from './especialidade.controller'
import { Especialidade } from './especialidade.entity'
import { EspecialidadeTypeormRepository } from './repositories/especialidade-typeorm.repository'
import { CriarEspecialidadeUc } from './usecases/criar-especialidade.uc'
import { ListarEspecialidadesUc } from './usecases/listar-especialidades.uc'

@Module({
  imports: [TypeOrmModule.forFeature([Especialidade])],
  controllers: [EspecialidadeController],
  providers: [
    { provide: 'EspecialidadeRepository', useClass: EspecialidadeTypeormRepository },
    CriarEspecialidadeUc,
    ListarEspecialidadesUc
  ],
  exports: [EspecialidadeTypeormRepository]
})
export class EspecialidadesModule {}