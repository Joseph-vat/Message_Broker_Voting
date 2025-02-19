import express from 'express';
import { buscarVotosCandidatos, votarCandidato } from '../controller/serverController';

const serverRoutes = express.Router(); // 👈 Correção: usar Router()
serverRoutes.use(express.json())

serverRoutes.post('/votar', votarCandidato);

serverRoutes.get("/resultados", buscarVotosCandidatos);

export { serverRoutes }
