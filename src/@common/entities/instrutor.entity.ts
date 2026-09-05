import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { AulaAgendada } from '../../aulas-agendadas/aula-agendada.entity'
import { Especialidade } from '../../especialidades/especialidade.entity'
import { Aluno } from './aluno.entity'

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

  @ManyToMany(() => Especialidade, (especialidade) => especialidade.instrutores)
  @JoinTable({
    name: 'instrutor_especialidade',
    joinColumn: { name: 'instrutor_id' },
    inverseJoinColumn: { name: 'especialidade_id' }
  })
  especialidades!: Especialidade[]

  @OneToMany(() => Aluno, (aluno) => aluno.instrutor)
  alunos!: Aluno[]

  @OneToMany(() => AulaAgendada, (aula) => aula.instrutor)
  aulas!: AulaAgendada[]
}