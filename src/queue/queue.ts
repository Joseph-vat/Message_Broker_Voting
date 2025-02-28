import { Queue } from "bullmq";

export const queue = new Queue("voting-queue", {
  connection: { 
    host: process.env.REDIS_HOST, 
    port: Number(process.env.REDIS_PORT) 
  },
  defaultJobOptions: {
    attempts: 5,  // Tenta executar até 5 vezes
    backoff: { type: "exponential", delay: 5000 },  // Aguarda 5s antes de cada nova tentativa
    removeOnComplete: true,  // Remove o job depois de processado com sucesso
    removeOnFail: false  // Mantém os jobs com erro para análise
  }
});

queue.on("error", (error) => {
  console.error("❌ Erro na fila:", error);
});
