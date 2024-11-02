"use client";

import { useEffect, useState } from "react";

import { Carrossel } from "../components/carrossel";

interface Partida {
  id: number;
  timeCasaId: number;
  timeVisitanteId: number;
  data: string;
  placarCasa: number;
  placarVisitante: number;
  estadio?: string;
  arbitro?: string;
  timeCasa : TimeCasa;
  timeVisitante :TimeVisitante;

}
interface TimeCasa {
    nome: string;
}
interface TimeVisitante {
    nome: string;
}

export default function Partidas() {
  const [partidas, setPartidas] = useState<Partida[]>([]);

  useEffect(() => {
    const fetchPartidas = async () => {
      try {
        const response = await fetch('http://localhost:3005/campeonato/todasPartidas');
        const data = await response.json();
        if (data) {
          setPartidas(data);
          console.log(data)
        }

      } catch (error) {
        console.error('Erro ao buscar partidas:', error);
      }
    };

    fetchPartidas();
  }, []);

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <Carrossel />
      <h1 className="text-3xl font-bold mb-5 text-gray-800">Partidas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-7xl">
        {partidas.map((partida) => (
          <div
            key={partida.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
          >
            <h2 className="font-medium text-lg">{`Partida ${partida.id}`}</h2>
            <p className="text-sm text-gray-600">{`Data: ${new Date(partida.data).toLocaleString()}`}</p>
            <p className="text-sm text-gray-600">{`Estádio: ${partida.estadio || 'Não informado'}`}</p>
            <p className="text-sm text-gray-600">{`Árbitro: ${partida.arbitro || 'Não informado'}`}</p>
            <p className="text-sm text-gray-600">{`Time Casa: ${partida.timeCasa.nome || 'Não informado'} X Time Visitante: ${partida.timeVisitante.nome}`}</p>

            <div className="mt-2">
              <span className="font-bold">{partida.placarCasa}</span> x <span className="font-bold">{partida.placarVisitante}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
