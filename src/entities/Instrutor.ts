import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { AulaAgendada } from './AulaAgendada'

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

  @OneToMany(() => AulaAgendada, (aula) => aula.instrutor)
  aulas!: AulaAgendada[]
}