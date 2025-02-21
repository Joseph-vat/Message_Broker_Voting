import { Queue } from "bullmq";

// Configuração do BullMQ (Gerenciamento de Filas)
export const queue = new Queue("voting-queue", { connection: { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) } });

console.log("Fila criada!");