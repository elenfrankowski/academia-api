import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

interface JwtPayload {
  sub: number
  email: string
  iss: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'segredo-provisorio-trocar-em-producao'
    })
  }

  validate(payload: JwtPayload) {
    const issuerEsperado = process.env.JWT_ISSUER ?? 'academia-api'
    if (payload.iss !== issuerEsperado) {
      throw new UnauthorizedException('Emissor do token inválido.')
    }
    return { userId: payload.sub, email: payload.email }
  }
}