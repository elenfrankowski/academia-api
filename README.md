# academia-api

API REST para gerenciamento de uma academia, desenvolvida em NestJS + TypeORM + PostgreSQL, como exercício prático de fixação de conceitos de back-end (arquitetura em camadas, autenticação, autorização e modelagem relacional).

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Modelagem de dados](#modelagem-de-dados)
- [Autenticação e autorização](#autenticação-e-autorização)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Endpoints](#endpoints)
- [Estrutura de pastas](#estrutura-de-pastas)

## Sobre o projeto

O sistema permite gerenciar **alunos**, **instrutores**, **aulas agendadas** e **especialidades** de uma academia, com controle de acesso via autenticação JWT e autorização por papéis (roles).

Cada aluno é vinculado a um instrutor responsável. Cada instrutor pode lecionar várias especialidades, e cada especialidade pode ser lecionada por vários instrutores (relação muitos-para-muitos). Aulas agendadas ligam um aluno a um instrutor em uma data e horário específicos.

## Tecnologias utilizadas

- **NestJS** — framework principal, com injeção de dependência nativa
- **TypeORM** — ORM para PostgreSQL, com `synchronize` para ambiente de desenvolvimento
- **PostgreSQL** — banco de dados relacional (via Docker)
- **Passport + passport-jwt** — estratégia de autenticação
- **bcrypt** — hash de senhas
- **@nestjs/jwt** — emissão e validação de tokens JWT

## Arquitetura

O projeto é organizado **por feature** (módulo), não por camada técnica isolada. Cada módulo de domínio (`alunos`, `instrutores`, `aulas-agendadas`, `especialidades`, `auth`) concentra seus próprios DTOs, repositórios (interface + implementação TypeORM), casos de uso e controller.

Entidades e utilitários compartilhados entre módulos ficam centralizados em `@common`.


**Decisões de design:**

- **Repository com interface + implementação**: cada módulo define uma interface de repositório (o contrato) e uma implementação concreta com TypeORM, injetada via token (`@Inject('AlunoRepository')`). Isso desacopla os casos de uso da tecnologia de persistência específica.
- **Casos de uso (`.uc.ts`) como unidade de regra de negócio**: cada ação (criar, listar, atualizar, remover) é uma classe própria com um único método `executar`, evitando controllers/services inchados.
- **Guards em camadas**: `JwtAuthGuard` garante que a requisição está autenticada; `RolesGuard` (aplicado seletivamente, via decorator `@Roles`) garante que o usuário autenticado tem a permissão necessária para a ação específica.

## Modelagem de dados

| Entidade | Relacionamento |
|---|---|
| `Aluno` → `Instrutor` | Muitos-para-um (cada aluno tem um instrutor responsável) |
| `Instrutor` ↔ `Especialidade` | Muitos-para-muitos (tabela de junção `instrutor_especialidade`) |
| `AulaAgendada` → `Aluno`, `Instrutor` | Muitos-para-um em ambos os lados |
| `Usuario` | Independente, usada exclusivamente para autenticação |

O campo `plano` (Aluno) e `role` (Usuario) são modelados como **enum** no TypeScript e no banco, evitando valores livres inconsistentes.

## Autenticação e autorização

- `POST /auth/registrar` e `POST /auth/login` são as únicas rotas públicas.
- Todas as demais rotas exigem um token JWT válido no cabeçalho `Authorization: Bearer <token>`.
- O token carrega `sub` (id do usuário), `email`, `role` e `iss` (issuer), este último validado manualmente contra a variável de ambiente `JWT_ISSUER`.
- Expiração do token configurável via `JWT_EXPIRES_IN`.
- Ações sensíveis (como remover um aluno) exigem a role `admin`, através do decorator `@Roles(RoleEnum.ADMIN)` combinado ao `RolesGuard`.

## Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose

### Passos

```bash
git clone https://github.com/SEU_USUARIO/academia-api.git
cd academia-api
npm install
docker compose up -d
```

Crie um arquivo `.env` na raiz:

```dotenv
DB_HOST=localhost
DB_PORT=5434
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=academia-db
JWT_SECRET=a272450f3beb1766179cef6b833f627fde23f30a4ed48e9317ffa8900827842e
JWT_EXPIRES_IN=1h
JWT_ISSUER=academia-api
```

Inicie a aplicação:

```bash
npm run start:dev
```

A API sobe em `http://localhost:3000`.

## Endpoints

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/auth/registrar` | Pública | Cria um novo usuário |
| POST | `/auth/login` | Pública | Autentica e retorna um JWT |
| GET/POST/PUT | `/alunos` | JWT | CRUD de alunos |
| DELETE | `/alunos/:id` | JWT + role `admin` | Remove um aluno |
| GET/POST | `/instrutores` | JWT | CRUD de instrutores |
| GET/POST | `/aulas-agendadas` | JWT | Agendamento de aulas |
| GET/POST | `/especialidades` | JWT | Catálogo de especialidades |

## Estrutura de pastas

```
src/
├── @common/
│   ├── entities/       # Entidades compartilhadas (Aluno, Instrutor, Usuario)
│   ├── enums/          # PlanoEnum, RoleEnum
│   └── platform/       # Configuração de banco e utilitários
├── alunos/
├── instrutores/
├── aulas-agendadas/
├── especialidades/
├── auth/
│   ├── decorators/     # @Roles
│   ├── guards/         # JwtAuthGuard, RolesGuard
│   └── strategies/     # JwtStrategy
├── app.module.ts
└── main.ts
```