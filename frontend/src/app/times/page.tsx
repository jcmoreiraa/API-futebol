"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Carrossel } from "../components/carrossel";

interface Jogador {
  id: number;
  nome: string;
  posicao: string;
}

interface Time {
  id: number;
  nome: string;
  estadio?: string;
  brasao?: string;
  jogadores: Jogador[];
}

export default function Times() {
  const [times, setTimes] = useState<Time[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await fetch('http://localhost:3005/campeonato/TodosTimes');
        const data = await response.json();
        if (data.times) {
          setTimes(data.times);
        }
      } catch (error) {
        console.error('Erro ao buscar times:', error);
      }
    };

    fetchTimes();
  }, []);

  const handleTimeClick = (id: number) => {
    router.push(`/time/${id}`); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <Carrossel/>
      <h1 className="text-3xl font-bold mb-5 text-gray-800">Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl ">
        {times.map((time) => (
          <div 
            key={time.id} 
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer " 
            onClick={() => handleTimeClick(time.id)} 
          >
            <div className="flex items-center mb-4">
              {time.brasao && (
                <Image 
                  src={time.brasao} 
                  alt={`${time.nome} logo`} 
                  width={50} 
                  height={40} 
                  className="mr-3 "
                />
              )}
              <div>
                <h2 className="font-medium text-lg">{time.nome}</h2>
                {time.estadio && <p className="text-sm text-gray-600">{time.estadio}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
