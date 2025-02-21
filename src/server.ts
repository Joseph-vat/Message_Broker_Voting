import express from 'express';
import { serverRoutes } from './routes/serverRoutes'; // Ajuste o caminho conforme necessário
import { routes } from './routes/index';

const app = express();

app.use(express.json());

// Use o roteador dentro do servidor principal
app.use(routes);  // Ou qualquer outro caminho base que você deseje


app.listen(3333, () => {
  console.log('Servidor rodando na porta 3000');
});

