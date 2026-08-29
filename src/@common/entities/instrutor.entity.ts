import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Aluno } from './aluno.entity'
import { AulaAgendada } from '../../aulas-agendadas/aula-agendada.entity'

@Entity('instrutor')
export class Instrutor {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 100 })
  nome!: string

  @Column({ type: 'varchar', length: 100 })
  especialidade!: string

  @Column({ type: 'varchar', length: 30, unique: true })
  registro!: string

  @OneToMany(() => Aluno, (aluno) => aluno.instrutor)
  alunos!: Aluno[]

  @OneToMany(() => AulaAgendada, (aula) => aula.instrutor)
  aulas!: AulaAgendada[]
}