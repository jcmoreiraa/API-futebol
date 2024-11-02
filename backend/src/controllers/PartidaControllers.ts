import { Request, response, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { request } from 'http';
import { time } from 'console';

const prisma = new PrismaClient();

export const getPartida = async (request: Request, response: Response) => {
    const { id} = request.params;

    try {
        const partida = await prisma.partida.findUnique({
            where: { id: Number(id) },
            include:{
                estatisticas: true,
                lesoes:true
            }
        
    }
);


        if (!partida) {
         response.status(404).json({ error: "Time não encontrado." });
        }

         response.status(200).json(partida);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    }
};


export const getAllPartida = async (request: Request, response: Response): Promise<void> => {
    try {
      const partidas = await prisma.partida.findMany({
        include: {
          estatisticas: true,
          lesoes: true,
          timeCasa: true, // Incluindo o time da casa
          timeVisitante: true, // Incluindo o time visitante
        },
      });
  
      if (partidas.length > 0) {
        response.status(200).json(partidas);
        return; 
      }
  
      response.status(400).json('Não há nenhuma partida criada');
    } catch (error: any) {
      console.error("Erro ao buscar partidas:", error);
      response.status(500).json('Ocorreu algum erro');
    }
  };
  
  

export const createPartida = async (request: Request, response: Response) => {
    const {
        timeCasaId,
        timeVisitanteId,
        data,
        placarCasa,
        placarVisitante,
        campeonatoId,
        estadio,
        arbitro,
        estatisticas,
        lesoes,
    } = request.body;

    try {
        const partida = await prisma.partida.create({
            data: {
                timeCasaId,
                timeVisitanteId,
                data,
                placarCasa,
                placarVisitante,
                campeonatoId,
                estadio,
                arbitro,
                estatisticas: {
                    create: estatisticas, 
                },
                lesoes: {
                    create: lesoes,
                },
            },
        });

        response.status(201).json({
            message: 'Partida criada com sucesso!',
            partida,
        });
    } catch (error: any) {
        console.error('Não foi possível criar a partida:', error);
        response.status(500).json({
            message: 'Erro ao criar a partida',
            error: error.message,
        });
    }
};
