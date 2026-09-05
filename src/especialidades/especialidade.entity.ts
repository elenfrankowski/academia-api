import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Instrutor } from '../@common/entities/instrutor.entity'

@Entity('especialidade')
export class Especialidade {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 100, unique: true })
  nome!: string

  @ManyToMany(() => Instrutor, (instrutor) => instrutor.especialidades)
  instrutores!: Instrutor[]
}