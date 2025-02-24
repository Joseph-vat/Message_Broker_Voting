import express from 'express';
import { routes } from './api/routes/index';

const app = express();

app.use(express.json());

app.use(routes); 

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Erro: A porta ${PORT} já está em uso.`);
  } else {
    console.error("❌ Erro ao iniciar o servidor:", error);
  }
});

console.error("Aguardando votos");



export default app;

