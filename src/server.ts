import express from 'express';
import path from 'path';
import { routes } from '.';

const app = express();


// Configurações e middlewares
app.use(express.json());

// Suas rotas
app.use(routes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
