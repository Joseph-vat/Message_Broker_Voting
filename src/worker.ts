import { Worker } from "bullmq";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar um worker que processa mensagens da fila de votação
const worker = new Worker("voting-queue", async (job) => {
    const { candidato } = job.data;

    console.log(`🗳️ Processando voto para: ${candidato}`);

    // Inserir no banco de dados
    await prisma.voto.create({
        data: { candidato },
    });

    console.log("✅ Voto registrado com sucesso!");
}, { connection: { host: "localhost", port: 6379 } });

console.log("🚀 Worker rodando e aguardando votos...");
