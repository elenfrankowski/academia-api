import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Aluno } from '../@common/entities/aluno.entity'
import { Instrutor } from '../@common/entities/instrutor.entity'
import { AulaAgendadaController } from './aula-agendada.controller'
import { AulaAgendada } from './aula-agendada.entity'
import { AulaAgendadaTypeormRepository } from './repositories/aula-agendada-typeorm.repository'
import { CriarAulaUc } from './usecases/criar-aula.uc'
import { GetAulaUc } from './usecases/get-aula.uc'
import { ListarAulasUc } from './usecases/listar-aulas.uc'

@Module({
  imports: [TypeOrmModule.forFeature([AulaAgendada, Aluno, Instrutor])],
  controllers: [AulaAgendadaController],
  providers: [
    { provide: 'AulaAgendadaRepository', useClass: AulaAgendadaTypeormRepository },
    CriarAulaUc,
    GetAulaUc,
    ListarAulasUc
  ]
})
export class AulasAgendadasModule {}