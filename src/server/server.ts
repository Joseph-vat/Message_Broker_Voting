import express from 'express';
import { routes } from './api/routes/index';

const app = express();

app.use(express.json());

app.use(routes); 
''

const server = app.listen(Number(process.env.PORT), () => {
  console.log(`🚀 Servidor rodando em http://localhost:${Number(process.env.PORT)}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Erro: A porta ${Number(process.env.PORT)} já está em uso.`);
  } else {
    console.error("❌ Erro ao iniciar o servidor:", error);
  }
});


export default app;

