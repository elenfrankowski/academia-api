import { Router } from 'express'

import { AppDataSource } from '../database/data-source'
import { Instrutor } from '../entities/Instrutor'

export const instrutorRoutes = Router()
const instrutorRepository = AppDataSource.getRepository(Instrutor)

instrutorRoutes.get('/', async (_req, res) => {
  const instrutores = await instrutorRepository.find()
  res.status(200).json(instrutores)
})

instrutorRoutes.get('/:id', async (req, res) => {
  const instrutor = await instrutorRepository.findOneBy({ id: Number(req.params.id) })
  if (!instrutor) {
    res.status(404).json({ mensagem: 'Instrutor não encontrado.' })
    return
  }
  res.status(200).json(instrutor)
})

instrutorRoutes.post('/', async (req, res) => {
  const { nome, especialidade, registro } = req.body as {
    nome?: string
    especialidade?: string
    registro?: string
  }
  if (!nome || !especialidade || !registro) {
    res.status(400).json({ mensagem: 'Os campos nome, especialidade e registro são obrigatórios.' })
    return
  }
  const novoInstrutor = instrutorRepository.create({ nome, especialidade, registro })
  const instrutorSalvo = await instrutorRepository.save(novoInstrutor)
  res.status(201).json(instrutorSalvo)
})

instrutorRoutes.put('/:id', async (req, res) => {
  const instrutor = await instrutorRepository.findOneBy({ id: Number(req.params.id) })
  if (!instrutor) {
    res.status(404).json({ mensagem: 'Instrutor não encontrado.' })
    return
  }
  const { nome, especialidade, registro } = req.body as {
    nome?: string
    especialidade?: string
    registro?: string
  }
  instrutor.nome = nome ?? instrutor.nome
  instrutor.especialidade = especialidade ?? instrutor.especialidade
  instrutor.registro = registro ?? instrutor.registro
  const instrutorAtualizado = await instrutorRepository.save(instrutor)
  res.status(200).json(instrutorAtualizado)
})

instrutorRoutes.delete('/:id', async (req, res) => {
  const instrutor = await instrutorRepository.findOneBy({ id: Number(req.params.id) })
  if (!instrutor) {
    res.status(404).json({ mensagem: 'Instrutor não encontrado.' })
    return
  }
  await instrutorRepository.remove(instrutor)
  res.status(204).send()
})