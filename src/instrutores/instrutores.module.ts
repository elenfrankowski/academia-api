import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Instrutor } from '../@common/entities/instrutor.entity'
import { Especialidade } from '../especialidades/especialidade.entity'
import { InstrutorController } from './instrutor.controller'
import { InstrutorTypeormRepository } from './repositories/instrutor-typeorm.repository'
import { CriarInstrutorUc } from './usecases/criar-instrutor.uc'
import { GetInstrutorUc } from './usecases/get-instrutor.uc'
import { ListarInstrutoresUc } from './usecases/listar-instrutores.uc'

@Module({
  imports: [TypeOrmModule.forFeature([Instrutor, Especialidade])],
  controllers: [InstrutorController],
  providers: [
    { provide: 'InstrutorRepository', useClass: InstrutorTypeormRepository },
    CriarInstrutorUc,
    GetInstrutorUc,
    ListarInstrutoresUc
  ]
})
export class InstrutoresModule {}