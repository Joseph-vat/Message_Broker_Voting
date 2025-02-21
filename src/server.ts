import express from 'express';
import { serverRoutes } from './api/routes/serverRoutes'; // Ajuste o caminho conforme necessário
import { routes } from './api/routes/index';

const app = express();

app.use(express.json());

// Use o roteador dentro do servidor principal
app.use(routes);  // Ou qualquer outro caminho base que você deseje


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

