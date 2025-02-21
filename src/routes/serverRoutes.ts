import express, { Request, Response } from 'express';
import { buscarVotosCandidatos, votarCandidato } from '../controller/serverController';

const serverRoutes = express.Router(); // Usando o Router() ao invés de express()
serverRoutes.use(express.json());

serverRoutes.post('/votar', votarCandidato)

serverRoutes.get('/resultados', buscarVotosCandidatos);

export { serverRoutes };
