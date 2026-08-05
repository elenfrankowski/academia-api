import { Router } from 'express'

import { AppDataSource } from '../database/data-source'
import { Aluno } from '../entities/Aluno'

export const alunoRoutes = Router()
const alunoRepository = AppDataSource.getRepository(Aluno)

alunoRoutes.get('/', async (_req, res) => {
  const alunos = await alunoRepository.find()
  res.status(200).json(alunos)
})

alunoRoutes.get('/:id', async (req, res) => {
  const aluno = await alunoRepository.findOneBy({ id: Number(req.params.id) })
  if (!aluno) {
    res.status(404).json({ mensagem: 'Aluno não encontrado.' })
    return
  }
  res.status(200).json(aluno)
})

alunoRoutes.post('/', async (req, res) => {
  const { nome, plano } = req.body as { nome?: string; plano?: string }
  if (!nome || !plano) {
    res.status(400).json({ mensagem: 'Os campos nome e plano são obrigatórios.' })
    return
  }
  const novoAluno = alunoRepository.create({ nome, plano })
  const alunoSalvo = await alunoRepository.save(novoAluno)
  res.status(201).json(alunoSalvo)
})

alunoRoutes.put('/:id', async (req, res) => {
  const aluno = await alunoRepository.findOneBy({ id: Number(req.params.id) })
  if (!aluno) {
    res.status(404).json({ mensagem: 'Aluno não encontrado.' })
    return
  }
  const { nome, plano } = req.body as { nome?: string; plano?: string }
  aluno.nome = nome ?? aluno.nome
  aluno.plano = plano ?? aluno.plano
  const alunoAtualizado = await alunoRepository.save(aluno)
  res.status(200).json(alunoAtualizado)
})

alunoRoutes.delete('/:id', async (req, res) => {
  const aluno = await alunoRepository.findOneBy({ id: Number(req.params.id) })
  if (!aluno) {
    res.status(404).json({ mensagem: 'Aluno não encontrado.' })
    return
  }
  await alunoRepository.remove(aluno)
  res.status(204).send()
})