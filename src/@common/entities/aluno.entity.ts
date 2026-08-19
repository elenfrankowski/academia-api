import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { AulaAgendada } from './AulaAgendada'

@Entity('aluno')
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 100 })
  nome!: string

  @Column({ type: 'varchar', length: 20 })
  plano!: string

  @OneToMany(() => AulaAgendada, (aula) => aula.aluno)
  aulas!: AulaAgendada[]
}