import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Aluno } from './Aluno'
import { Instrutor } from './Instrutor'

@Entity('aula_agendada')
export class AulaAgendada {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'timestamp' })
  dataHora!: Date

  @ManyToOne(() => Aluno, (aluno) => aluno.aulas)
  @JoinColumn({ name: 'aluno_id' })
  aluno!: Aluno

  @ManyToOne(() => Instrutor, (instrutor) => instrutor.aulas)
  @JoinColumn({ name: 'instrutor_id' })
  instrutor!: Instrutor
}