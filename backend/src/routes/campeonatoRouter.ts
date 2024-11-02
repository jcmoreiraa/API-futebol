import express, { Request, Response, Router } from 'express';
import { getCampeonato } from '../controllers/CampeonatoControllers';
import { getAllTime, getTime } from '../controllers/TimeControllers';
import { createPartida, getAllPartida, getPartida } from '../controllers/PartidaControllers';
import { getAllJogadores, getJogador, getJogadorId } from '../controllers/JogadorControllers';


const campeonatoRouter = Router();
campeonatoRouter.get('/buscarTime/:id', getTime); // Rota para buscar campeonato por ID
campeonatoRouter.get('/buscarPartida/:id', getPartida)
campeonatoRouter.get('/buscar/:id', getCampeonato); // Rota para buscar campeonato por ID
campeonatoRouter.get('/buscarJogador/:nome' ,getJogador)
campeonatoRouter.get('/buscarJogadorId/:id' ,getJogadorId)
campeonatoRouter.get('/TodosTimes', getAllTime)
campeonatoRouter.get('/todosJogadores', getAllJogadores)
campeonatoRouter.post('/createPartida', createPartida)
campeonatoRouter.get('/todasPartidas', getAllPartida)




export default campeonatoRouter;
