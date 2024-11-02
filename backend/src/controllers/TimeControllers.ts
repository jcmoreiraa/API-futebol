import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTime = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const time = await prisma.time.findUnique({
            where: { id: Number(id) },
            include:{jogadores:true,
                partidasCasa:true,
                partidasVisitante:true
            }
        
    }
);

        if (!time) {
         response.status(404).json({ error: "Time não encontrado." });
        }

         response.status(200).json(time);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
};

export const getAllTime = async (request: Request, response: Response) => {
    try {
        const times = await prisma.time.findMany();
        if (times.length !== 0) {
            response.status(200).json({ times });
        } else {
            response.status(404).json({ message: 'No time records found.' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal server error.' });
    }
};

