import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCampeonato = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const campeonato = await prisma.campeonato.findUnique({
            where: { id: Number(id) },
        });

        if (!campeonato) {
         response.status(404).json({ error: "Campeonato não encontrado." });
        }

         response.status(200).json(campeonato);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
};


