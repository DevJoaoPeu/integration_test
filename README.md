# Integration Tests - User API

Uma API REST para gerenciar usuários com testes de integração completos. Projeto NestJS com PostgreSQL e TypeORM.

---

## 📋 Objetivo do Projeto

Este projeto demonstra como implementar uma API REST com **testes de integração de ponta a ponta** usando:

- **NestJS**: Framework Node.js modular e escalável
- **PostgreSQL**: Banco de dados relacional
- **TypeORM**: ORM para gerenciar entidades e queries
- **Jest**: Framework de testes com cobertura

O foco é ensinar padrões de testes de integração em uma aplicação real, garantindo que a API funcione corretamente com a base de dados.

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────┐
│           Client (HTTP Requests)            │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│           NestJS Application                │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │      UserController (Routes)         │  │
│  │  GET  /users        (list users)     │  │
│  │  POST /users        (create user)    │  │
│  └────────────┬─────────────────────────┘  │
│               │                             │
│  ┌────────────▼─────────────────────────┐  │
│  │      UserService (Business Logic)    │  │
│  │  - list()                            │  │
│  │  - create(name)                      │  │
│  └────────────┬─────────────────────────┘  │
│               │                             │
│  ┌────────────▼──────────────────────────┐ │
│  │   TypeORM Repository (Data Access)   │ │
│  │   Queries direto no banco de dados   │ │
│  └────────────┬───────────────────────────┘ │
│               │                             │
└───────────────┼─────────────────────────────┘
                │
┌───────────────▼─────────────────────────────┐
│      PostgreSQL Database                    │
│  ┌────────────────────────────────┐        │
│  │      users (table)             │        │
│  │  id (PK) | name                │        │
│  └────────────────────────────────┘        │
└─────────────────────────────────────────────┘
```

### Camadas:

1. **Controller** - Recebe requisições HTTP e roteia para o serviço
2. **Service** - Contém lógica de negócio
3. **Repository** - Acessa dados via TypeORM
4. **Entity** - Define estrutura das tabelas
5. **Config** - Carrega variáveis de ambiente

---

## ⚙️ Instalação

### Pré-requisitos

- **Node.js** v18+
- **npm** ou **yarn**
- **PostgreSQL** (local ou container Docker)

### Passo 1: Clonar o Repositório

```bash
cd ~/Downloads/projetos/pessoal/integration_test
```

### Passo 2: Instalar Dependências

```bash
yarn install
# ou
npm install
```

### Passo 3: Configurar o Banco de Dados

Crie um arquivo `.env` na raiz do projeto:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha
POSTGRES_DATABASE=integration_test
```

#### Opção A: PostgreSQL Local

```bash
# Instalar PostgreSQL (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib

# Iniciar o serviço
sudo systemctl start postgresql

# Criar banco de dados
sudo -u postgres createdb integration_test
```

#### Opção B: PostgreSQL com Docker (Recomendado)

```bash
docker run --name postgres-integration \
  -e POSTGRES_PASSWORD=sua_senha \
  -e POSTGRES_DB=integration_test \
  -p 5432:5432 \
  -d postgres:16-alpine
```

Aguarde ~10 segundos para o banco estar pronto.

### Passo 4: Executar a Aplicação

```bash
# Modo desenvolvimento (com auto-reload)
yarn start:dev

# Modo produção
yarn build
yarn start:prod
```

A API estará disponível em `http://localhost:3000`

---

## 🧪 Testando a API

### Com cURL:

```bash
# Listar usuários
curl http://localhost:3000/users

# Criar um novo usuário
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva"}'
```

### Com Insomnia/Postman:

**GET** `http://localhost:3000/users`

**POST** `http://localhost:3000/users`
```json
{
  "name": "João Silva"
}
```

---

## 🧪 Rodando Testes

```bash
# Testes unitários
yarn test

# Testes em modo watch (reexecuta ao salvar)
yarn test:watch

# Testes de integração (e2e)
yarn test:e2e

# Cobertura de testes
yarn test:cov
```

O arquivo de testes está em `src/user/__tests__/user.integration.spec.ts`

---

## 📁 Estrutura do Projeto

```
src/
├── app.module.ts           # Módulo raiz (imports, configs)
├── main.ts                 # Entry point
├── entity/
│   └── user.entity.ts      # Definição da entidade User
└── user/
    ├── user.module.ts      # Módulo de User
    ├── user.controller.ts  # Rotas HTTP
    ├── user.service.ts     # Lógica de negócio
    └── __tests__/
        └── user.integration.spec.ts  # Testes de integração
```

---

## 📚 Comandos Úteis

```bash
# Verificar código (linting)
yarn lint

# Formatar código
yarn format

# Build para produção
yarn build

# Modo debug
yarn start:debug
```

---

## 🔧 Stack Utilizado

- **Backend**: NestJS 11
- **Banco de Dados**: PostgreSQL 16
- **ORM**: TypeORM 0.3
- **Testes**: Jest 30, Supertest
- **Linguagem**: TypeScript 5.7
- **Formatter**: Prettier
- **Linter**: ESLint

---

## 📝 Licença

UNLICENSED
