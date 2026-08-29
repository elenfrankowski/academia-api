import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Aluno } from '../@common/entities/aluno.entity'
import { Instrutor } from '../@common/entities/instrutor.entity'
import { AlunoController } from './aluno.controller'
import { AlunoTypeormRepository } from './repositories/aluno-typeorm.repository'
import { AtualizarAlunoUc } from './usecases/atualizar-aluno.uc'
import { CriarAlunoUc } from './usecases/criar-aluno.uc'
import { GetAlunoUc } from './usecases/get-aluno.uc'
import { ListarAlunosUc } from './usecases/listar-alunos.uc'
import { RemoverAlunoUc } from './usecases/remover-aluno.uc'

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, Instrutor])],
  controllers: [AlunoController],
  providers: [
    { provide: 'AlunoRepository', useClass: AlunoTypeormRepository },
    CriarAlunoUc,
    GetAlunoUc,
    ListarAlunosUc,
    AtualizarAlunoUc,
    RemoverAlunoUc
  ]
})
export class AlunosModule {}