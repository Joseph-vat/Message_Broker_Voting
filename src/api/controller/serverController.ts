import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { queue } from '../../queue/queue';

const prisma = new PrismaClient();

// Endpoint para registrar um voto
export async function votarCandidato(req: Request, res: Response) {
    try {

        const { candidato } = req.body;

        console.log("candidato");


        if (!candidato) {
            res.status(400).json({ error: "Candidato é obrigatório." });
        }

        // Enviar voto para a fila
        await queue.add("processarVoto", { candidato });

        res.json({ message: "Voto registrado e enviado para processamento!" });
    }
    catch (error) {
        console.error("Erro ao registrar voto:", error);
        res.status(500).json({ error: "Erro interno ao processar o voto." });
    }

};

// Endpoint para obter a contagem de votos
export async function buscarVotosCandidatos(req: Request, res: Response) {
    const resultados = await prisma.voto.groupBy({
        by: ["candidato"],
        _count: { candidato: true },
    });

    res.json(resultados);
};
