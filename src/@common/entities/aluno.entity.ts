import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { AulaAgendada } from '../../aulas-agendadas/aula-agendada.entity'
import { Instrutor } from './instrutor.entity'

@Entity('aluno')
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 100 })
  nome!: string

  @Column({ type: 'varchar', length: 20 })
  plano!: string

  @ManyToOne(() => Instrutor, (instrutor) => instrutor.alunos)
  @JoinColumn({ name: 'instrutor_id' })
  instrutor!: Instrutor

  @OneToMany(() => AulaAgendada, (aula) => aula.aluno)
  aulas!: AulaAgendada[]
}