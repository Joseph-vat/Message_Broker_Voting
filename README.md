Aqui está um exemplo de **README.md** para o seu projeto de sistema de votação usando **Express**, **Redis**, **BullMQ**, e **PostgreSQL**. Este README é claro, informativo e cobre todos os aspectos importantes do projeto.

---

# Sistema de Votação

Este projeto é um sistema de votação que permite aos usuários enviar votos via API, processá-los em uma fila usando Redis e BullMQ, e armazenar os resultados em um banco de dados PostgreSQL.

---

## Tecnologias Utilizadas

- **Backend:** Node.js + Express
- **Fila de Mensagens:** BullMQ + Redis
- **Banco de Dados:** PostgreSQL
- **Ferramentas de Desenvolvimento:** TypeScript, RedisInsight, pgAdmin

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

- Node.js (v18 ou superior)
- Redis (instalado e rodando)
- PostgreSQL (instalado e rodando)
- Yarn ou NPM (gerenciador de pacotes)

### Passos para Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/sistema-votacao.git
   cd sistema-votacao
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configure o ambiente:**
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
     ```env
     # Redis
     REDIS_HOST=localhost
     REDIS_PORT=6379

     # PostgreSQL
     POSTGRES_HOST=localhost
     POSTGRES_PORT=5432
     POSTGRES_USER=seu_usuario
     POSTGRES_PASSWORD=sua_senha
     POSTGRES_DB=votacao

     # Servidor
     PORT=3000
     ```

4. **Execute as migrações do banco de dados:**
   - Certifique-se de que o PostgreSQL está rodando.
   - Execute as migrações para criar a tabela de votos:
     ```bash
     yarn migrate
     # ou
     npm run migrate
     ```

5. **Inicie o servidor:**
   ```bash
   yarn start
   # ou
   npm start
   ```

6. **Inicie o Worker:**
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
  curl -X POST http://localhost:3000/votar -H "Content-Type: application/json" -d '{"candidato": "Candidato A"}'
  ```
- **Resposta:**
  ```json
  {
    "message": "Voto recebido com sucesso"
  }
  ```

### 2. Consultar Resultados (GET `/resultados`)
- **Descrição:** Retorna a contagem de votos.
- **Exemplo de requisição:**
  ```bash
  curl -X GET http://localhost:3000/resultados
  ```
- **Resposta:**
  ```json
  {
    "Candidato A": 5,
    "Candidato B": 3
  }
  ```

---

## Estrutura do Projeto

```
sistema-votacao/
├── src/
│   ├── api/               # Rotas e controllers
│   ├── worker/            # Worker para processar a fila
│   ├── db/                # Configuração do banco de dados
│   ├── queues/            # Configuração da fila (BullMQ)
│   ├── utils/             # Utilitários (logs, validações, etc.)
│   ├── app.ts             # Configuração do Express
│   └── server.ts          # Inicialização do servidor
├── migrations/            # Migrações do banco de dados
├── .env                   # Variáveis de ambiente
├── tsconfig.json          # Configuração do TypeScript
├── package.json           # Dependências e scripts
└── README.md              # Documentação do projeto
```

---

## Como Testar

### Testes Automatizados
- Execute os testes automatizados com o seguinte comando:
  ```bash
  yarn test
  # ou
  npm test
  ```

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

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contato

- **Autor:** [Seu Nome]
- **Email:** [seu-email@exemplo.com]
- **GitHub:** [https://github.com/seu-usuario](https://github.com/seu-usuario)

---

Esse README cobre tudo o que é necessário para entender, configurar e executar o projeto. Se precisar de mais alguma coisa, é só avisar! 😊