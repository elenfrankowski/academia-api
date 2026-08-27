import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Usuario } from '../@common/entities/usuario.entity'
import { AuthController } from './auth.controller'
import { UsuarioTypeormRepository } from './repositories/usuario-typeorm.repository'
import { LoginUc } from './usecases/login.uc'
import { RegistrarUc } from './usecases/registrar.uc'

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'segredo-provisorio-trocar-em-producao',
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'UsuarioRepository', useClass: UsuarioTypeormRepository },
    RegistrarUc,
    LoginUc
  ]
})
export class AuthModule {}