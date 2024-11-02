import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { request } from 'http';

const prisma = new PrismaClient();
export const getJogador = async (request: Request, response: Response) => {
    const { nome } = request.params;

    try {
        const jogador = await prisma.jogador.findFirst({
            where: {  nome }
        });

        if (!jogador) {
            response.status(404).json({ error: "Jogador não encontrado." });
        }

        const jogadorComDetalhes = await prisma.jogador.findUnique({
            where: { id: jogador?.id },
            include: {
                estatisticas: true,  
                lesoes: true
            }
        });

         response.status(200).json(jogadorComDetalhes);
    } catch (error: any) {
         response.status(500).json({ error: error.message });
    }
};

export const getJogadorId = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const jogador = await prisma.jogador.findUnique({
            where: { id: Number(id) },
            include: {
                estatisticas: {
                    where: {
                        jogadorId: Number(id) 
                    }
                },
                lesoes: {
                    where: {
                        jogadorId:Number(id),
                    }
                }
            }
        });

        if (!jogador) {
            response.status(404).json({ error: "Jogador não encontrado." });
        }

         response.status(200).json(jogador);
    } catch (error: any) {
         response.status(500).json({ error: error.message });
    }
};


export const getAllJogadores = async (request:Request, response:Response) =>{
try{
    const jogadores = await prisma.jogador.findMany()
       
    if (jogadores.length === 0) {
            response.json('Não existem jogadores')  
        }
    else{
        response.status(200).json({jogadores})
    }
        
    
}catch(error){
    response.status(500).json('Ocorreu um erro')
}}