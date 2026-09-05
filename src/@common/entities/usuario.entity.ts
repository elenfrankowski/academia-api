import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { RoleEnum } from '../enums/role.enum'

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 100 })
  nome!: string

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string

  @Column({ type: 'varchar', length: 255 })
  senhaHash!: string

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.INSTRUTOR })
  role!: RoleEnum
}