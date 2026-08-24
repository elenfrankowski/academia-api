import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Aluno } from '../@common/entities/aluno.entity'
import { AlunoController } from './aluno.controller'
import { AlunoTypeormRepository } from './repositories/aluno-typeorm.repository'
import { CriarAlunoUc } from './usecases/criar-aluno.uc'
import { GetAlunoUc } from './usecases/get-aluno.uc'
import { ListarAlunosUc } from './usecases/listar-alunos.uc'

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  controllers: [AlunoController],
  providers: [
    { provide: 'AlunoRepository', useClass: AlunoTypeormRepository },
    CriarAlunoUc,
    GetAlunoUc,
    ListarAlunosUc
  ]
})
export class AlunosModule {}