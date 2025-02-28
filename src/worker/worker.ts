import { Worker } from "bullmq";
import { prismaClient } from "../server/database/prismaClient";

const worker = new Worker("voting-queue", async (job) => {
    const { candidato } = job.data;

    try {
        const voto = await prismaClient.voto.create({
            data: { candidato },
        });
        console.log("✅ Voto registrado com sucesso:", voto);
        return voto;
    }
    catch (error) {
        console.error("❌ Erro ao registrar voto:", error);
    }
    finally {
        await prismaClient.$disconnect();
    }
}, {
    connection: { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) },
    concurrency: 5, // Número máximo de jobs processando simultaneamente
    lockDuration: 30000 // Tempo que o worker segura o job antes de liberá-lo
});

worker.on("failed", (job, err) => {
    console.error(`❌ Worker falhou ao processar job ${job?.id}. Erro: ${err.message}`);
});

console.log("🚀 Worker rodando e aguardando votos...");


