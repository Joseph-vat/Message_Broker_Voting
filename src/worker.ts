import { Worker } from "bullmq";
import { prismaClient } from "../src/database/prismaClient";

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
}, { connection: { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) } });

console.log("🚀 Worker rodando e aguardando votos...");


