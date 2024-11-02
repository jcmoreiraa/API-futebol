'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image'; 
import { useRouter } from 'next/navigation';
interface Jogador {
  numero: number;
  nome: string;
  posicao: string;
  foto: string;
  id:number;
}

interface TimeData {
  nome: string;
  estadio: string;
  brasao: string;
  jogadores: Jogador[];
}

const Time = () => {
  const router = useRouter()
  const { id } = useParams(); 
  const [time, setTime] = useState<TimeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTime = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:3005/campeonato/buscarTime/${id}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar o time');
          }
          const data: TimeData = await response.json();
          setTime(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTime();
  }, [id]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (!time) return <div className="text-center text-lg">Time não encontrado</div>;
  const handleTimeClick = (id: number) => {
    router.push(`/jogador/${id}`); 
};
  return (
    <div className="flex flex-col items-center p-5 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{time.nome}</h1>
      <Image 
        src={time.brasao} 
        alt={`${time.nome} Logo`} 
        width={300} 
        height={200} 
        className="mb-4 rounded-lg shadow-lg object-cover "
      />
      <p className="text-xl text-gray-700 mb-4">Estádio: {time.estadio}</p>
      <h2 className="text-2xl font-semibold mb-2">Jogadores:</h2>
      <ul className="list-disc list-inside">
        {time.jogadores.map((jogador) => (
          <li key={jogador.numero} className="flex items-center mb-2">
            <Image 
              src={'/homem.webp'} 
              alt={jogador.nome} 
              width={50} 
              height={50} 
              className="rounded-full mr-3 border border-gray-300" 
            />
            <p className="text-gray-800 cursor-pointer" onClick={()=> handleTimeClick(jogador.id)}>
              {jogador.nome} - {jogador.posicao} - #{jogador.numero}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Time;


