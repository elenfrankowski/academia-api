export function ehTextoValido(valor: unknown): valor is string {
  return typeof valor === 'string' && valor.trim().length > 0
}

export function ehNumeroValido(valor: unknown): valor is number {
  return typeof valor === 'number' && !Number.isNaN(valor) && valor > 0
}

export function ehDataValida(valor: unknown): valor is string {
  return typeof valor === 'string' && !Number.isNaN(Date.parse(valor))
}