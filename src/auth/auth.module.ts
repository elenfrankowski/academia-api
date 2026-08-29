import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SignOptions } from 'jsonwebtoken'

import { Usuario } from '../@common/entities/usuario.entity'
import { AuthController } from './auth.controller'
import { UsuarioTypeormRepository } from './repositories/usuario-typeorm.repository'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LoginUc } from './usecases/login.uc'
import { RegistrarUc } from './usecases/registrar.uc'

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'segredo-provisorio-trocar-em-producao',
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN ?? '1h') as SignOptions['expiresIn']
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'UsuarioRepository', useClass: UsuarioTypeormRepository },
    RegistrarUc,
    LoginUc,
    JwtStrategy
  ]
})
export class AuthModule {}