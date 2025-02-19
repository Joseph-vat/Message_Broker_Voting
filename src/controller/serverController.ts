import express, { Request, Response } from 'express';
import { Queue } from "bullmq";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

// Configuração do BullMQ (Gerenciamento de Filas)
const queue = new Queue("voting-queue", { connection: { host: "localhost", port: 6379 } });

// Endpoint para registrar um voto
export async function votarCandidato(req: Request, res: Response) {
    try {

        const { candidato } = req.body;

        if (!candidato) {
            return res.status(400).json({ error: "Candidato é obrigatório." });
        }

        // Enviar voto para a fila
        await queue.add("processarVoto", { candidato });

        return res.json({ message: "Voto registrado e enviado para processamento!" });
    }
    catch (error) {

    }

};

// Endpoint para obter a contagem de votos
export async function buscarVotosCandidatos(req: Request, res: Response) {
    const resultados = await prisma.voto.groupBy({
        by: ["candidato"],
        _count: { candidato: true },
    });

    return res.json(resultados);
};

