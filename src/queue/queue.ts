import { Queue } from "bullmq";

export const queue = new Queue("voting-queue", { 
  connection: { 
    host: process.env.REDIS_HOST, 
    port: Number(process.env.REDIS_PORT) 
  } 
});

// Captura erros gerais da conexão com o Redis ou da própria fila
queue.on("error", (error) => {
  console.error("❌ Erro na fila:", error);
});
