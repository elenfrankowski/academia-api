import { Router } from 'express'

import { AppDataSource } from '../database/data-source'
import { Aluno } from '../entities/Aluno'
import { AulaAgendada } from '../entities/AulaAgendada'
import { Instrutor } from '../entities/Instrutor'

export const aulaAgendadaRoutes = Router()
const aulaRepository = AppDataSource.getRepository(AulaAgendada)
const alunoRepository = AppDataSource.getRepository(Aluno)
const instrutorRepository = AppDataSource.getRepository(Instrutor)

aulaAgendadaRoutes.get('/', async (_req, res) => {
  const aulas = await aulaRepository.find({ relations: { aluno: true, instrutor: true } })
  res.status(200).json(aulas)
})

aulaAgendadaRoutes.get('/:id', async (req, res) => {
  const aula = await aulaRepository.findOne({
    where: { id: Number(req.params.id) },
    relations: { aluno: true, instrutor: true }
  })
  if (!aula) {
    res.status(404).json({ mensagem: 'Aula agendada não encontrada.' })
    return
  }
  res.status(200).json(aula)
})

aulaAgendadaRoutes.post('/', async (req, res) => {
  const { dataHora, alunoId, instrutorId } = req.body as {
    dataHora?: string
    alunoId?: number
    instrutorId?: number
  }
  if (!dataHora || !alunoId || !instrutorId) {
    res.status(400).json({ mensagem: 'Os campos dataHora, alunoId e instrutorId são obrigatórios.' })
    return
  }

  const aluno = await alunoRepository.findOneBy({ id: alunoId })
  const instrutor = await instrutorRepository.findOneBy({ id: instrutorId })
  if (!aluno || !instrutor) {
    res.status(400).json({ mensagem: 'Aluno ou instrutor informado não existe.' })
    return
  }

  const novaAula = aulaRepository.create({ dataHora: new Date(dataHora), aluno, instrutor })
  const aulaSalva = await aulaRepository.save(novaAula)
  res.status(201).json(aulaSalva)
})

aulaAgendadaRoutes.put('/:id', async (req, res) => {
  const aula = await aulaRepository.findOne({
    where: { id: Number(req.params.id) },
    relations: { aluno: true, instrutor: true }
  })
  if (!aula) {
    res.status(404).json({ mensagem: 'Aula agendada não encontrada.' })
    return
  }
  const { dataHora } = req.body as { dataHora?: string }
  aula.dataHora = dataHora ? new Date(dataHora) : aula.dataHora
  const aulaAtualizada = await aulaRepository.save(aula)
  res.status(200).json(aulaAtualizada)
})

aulaAgendadaRoutes.delete('/:id', async (req, res) => {
  const aula = await aulaRepository.findOneBy({ id: Number(req.params.id) })
  if (!aula) {
    res.status(404).json({ mensagem: 'Aula agendada não encontrada.' })
    return
  }
  await aulaRepository.remove(aula)
  res.status(204).send()
})