import express from 'express';
import { serverRoutes } from './routes/serverRoutes';

const routes = express();

routes.use(serverRoutes);

export { routes };