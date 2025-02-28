import express from 'express';
import { serverRoutes } from './serverRoutes';

const routes = express.Router();

routes.use(serverRoutes);

export { routes };