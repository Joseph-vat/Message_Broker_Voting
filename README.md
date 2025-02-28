# Sistema de Votação

Este projeto é um sistema de votação que permite aos usuários enviar votos via API, processá-los em uma fila usando Redis e BullMQ, e armazenar os resultados em um banco de dados PostgreSQL.

---

## Tecnologias Utilizadas

- **Backend:** Node.js + Express
- **Fila de Mensagens:** BullMQ + Redis
- **Banco de Dados:** PostgreSQL
- **Tecnologia de Desenvolvimento:** TypeScript
- **Ferramentas de Desenvolvimento:** RedisInsight, pgAdmin

---

## Funcionamento do Sistema

O sistema funciona em 6 etapas principais:

1. **Usuário** → Envia um voto via API (POST `/votar`).
2. **Servidor Express** → Recebe o voto e adiciona à fila do Redis.
3. **Fila de Mensagens (BullMQ + Redis)** → Mantém os votos organizados para processamento.
4. **Worker** → Lê a fila e grava os votos no banco de dados PostgreSQL.
5. **Banco de Dados** → Armazena os votos de forma segura.
6. **Consulta** → Retorna a contagem de votos via API (GET `/resultados`).

---

## Como Executar o Projeto

### Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado os seguintes requisitos:
- Node.js (v18 ou superior)
- NPM (gerenciador de pacotes)

Caso algum desses itens não esteja instalado, siga o passo abaixo.

### Instalando os Pré-requisitos

#### 📌 Node.js + NPM
1. Acesse [Node.js](https://nodejs.org) e baixe a versão LTS.
2. Após a instalação, verifique se o Node.js e o NPM estão instalados:
   ```sh
    node -v
    npm -v
    ```

### Passos para Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/Message_Broker_Voting.git
   cd Message_Broker_Voting
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o ambiente:**
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
    ```env
     # Redis
     REDIS_HOST=localhost
     REDIS_PORT=6379

     # PostgreSQL
     POSTGRES_USER=seu_usuario
     POSTGRES_PASSWORD=sua_senha
     POSTGRES_HOST=localhost
     POSTGRES_PORT=5432
     POSTGRES_DB=votacao

     # Servidor
     PORT=3000
     ```

4. **Instale as imagens Docker com o Docker-compose:**
   - Execute o comando abaixo para baixar as imagens:
    ```bash
      docker-compose up -d --build
      ```

5. **Execute as migrações do banco de dados:**
   - Certifique-se de que o PostgreSQL está rodando.
   - Execute as migrações para criar a tabela de votos:
    ```bash
     npx prisma migrate dev
     ```

6. **Inicie o servidor:**
   ```bash
   yarn start
   # ou
   npm start
   ```

7. **Inicie o Worker:**
   - Em um terminal separado, inicie o Worker para processar a fila:
    ```bash
     yarn worker
     # ou
     npm run worker
     ```

---

## Endpoints da API

### 1. Enviar um Voto (POST `/votar`)
- **Descrição:** Envia um voto para ser processado.
- **Exemplo de requisição:**
  ```bash
  http://localhost:3000/votar 
  ```
    ```json
  {
        "candidato": "Candidato X"
  }
  ```
- **Resposta:**
  ```json
  {
    "message": "Voto para o candidato candidato X enviado para a fila para ser processado!"
  }
  ```

### 2. Consultar Resultados (GET `/resultados`)
- **Descrição:** Retorna a contagem de votos.
- **Exemplo de requisição:**
  ```bash
  http://localhost:3000/resultados 
  ```
- **Resposta:**
  ```json
  [
	{
		"_count": {
			"candidato": 1
		},
		"candidato": "Candidato A"
	},
	{
		"_count": {
			"candidato": 23
		},
		"candidato": "Candidato B"
	},
  ]
  ```

---

## Estrutura do Projeto

  ```
  MESSAGE_BROKER_VOTING/
  ├── node_modules/                  # Dependências do projeto (gerado automaticamente)
  ├── prisma/                        # Configurações do Prisma
  │   ├── migrations/                # Migrações do banco de dados
  │   │   └── ...                    # Arquivos de migração
  │   └── schema.prisma              # Schema do Prisma
  ├── src/                           # Código-fonte do projeto
  │   ├── queue/                     # Configuração da fila (BullMQ)
  │   │   └── queue.ts               # Configuração da fila
  │   ├── server/                    # Configurações do servidor
  │   │   ├── api/                   # Rotas e controllers
  │   │   │   └── ...                # Arquivos de rotas/controllers
  │   │   ├── database/              # Configurações do PrismaClient
  │   │   │   └── prismaClient.ts    # Instância do PrismaClient
  │   │   └── server.ts              # Inicialização do servidor
  │   ├── worker/                    # Worker para processar a fila
  │   │   └── worker.ts              # Configuração do worker
  ├── .env                           # Variáveis de ambiente
  ├── docker-compose.yml             # Configuração do Docker Compose
  ├── Dockerfile                     # Configuração do Docker
  ├── .gitignore                     # Arquivos e diretórios ignorados pelo Git
  ├── tsconfig.json                  # Configuração do TypeScript
  ├── package-lock.json              # Versões exatas das dependências (gerado automaticamente)
  ├── package.json                   # Dependências e scripts do projeto
  └── README.md                      # Documentação do projeto
  ```

---

## Como Testar

### Testes Manuais
1. Envie votos usando o endpoint POST `/votar`.
2. Verifique a fila no RedisInsight para confirmar que os votos foram adicionados.
3. Confirme que o Worker está processando os votos e gravando no PostgreSQL.
4. Consulte os resultados usando o endpoint GET `/resultados`.

---

## Visualizando Dados no Redis e PostgreSQL

### Redis
- Use o **RedisInsight** para visualizar a fila `voting-queue` e os jobs.
- Verifique as estruturas de dados: **hashes**, **sorted sets**, e **streams**.

### PostgreSQL
- Use o **pgAdmin** ou `psql` para visualizar a tabela `votos`:
  ```sql
  SELECT * FROM votos;
  ```

---

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---


passos:

clonar repostitorio
docker-compose up -d --build
criar banco de dados
npx prisma migrate dev
npm start
npm run worker

