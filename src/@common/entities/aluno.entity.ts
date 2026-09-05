import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { AulaAgendada } from '../../aulas-agendadas/aula-agendada.entity'
import { PlanoEnum } from '../enums/plano.enum'
import { Instrutor } from './instrutor.entity'

@Entity('aluno')
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 100 })
  nome!: string

  @Column({ type: 'enum', enum: PlanoEnum })
  plano!: PlanoEnum

  @ManyToOne(() => Instrutor, (instrutor) => instrutor.alunos)
  @JoinColumn({ name: 'instrutor_id' })
  instrutor!: Instrutor

  @OneToMany(() => AulaAgendada, (aula) => aula.aluno)
  aulas!: AulaAgendada[]
}