import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient'
import { queue } from '../../../queue/queue';


// Endpoint para registrar um voto
export async function votarCandidato(req: Request, res: Response) {
    try {
        console.log("Aqui");
        
        const { candidato } = req.body;

        if (!candidato) {
            res.status(400).json({ error: "Candidato é obrigatório." });
        }
        
        // ao invés de add direto com o prismaClient, ele manda primeiro pra queue
        await queue.add("processarVoto", { candidato });

        console.log(`Voto para o candidato ${candidato} enviado para a fila para ser processado!`);
        

        res.status(200).json({ message: `Voto para o candidato ${candidato} enviado para a fila para ser processado!` });
    }
    catch (error) {
        console.error("Erro ao registrar voto:", error);
        res.status(500).json({ error: "Erro interno ao processar o voto." });
    }

};

// Endpoint para obter a contagem de votos
export async function buscarVotosCandidatos(req: Request, res: Response) {
    try {
        const resultados = await prismaClient.voto.groupBy({
            by: ['candidato'],
            _count: {
                candidato: true,
            },
        });

        res.status(200).json(resultados);
    } catch (error) {
        console.error('Erro ao consultar resultados:', error);
        res.status(500).json({ error: 'Erro ao consultar resultados' });
    }
};
