'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image'; 

interface Lesao {
    id: number;
    tipoLesao: string;
    duracaoEstimada?: string;
    partidaId: number; 
}
  
interface Estatistica {
    id: number;
    jogadorId: number;
    partidaId: number;
    gols: number;
    assistencias: number;
    passesCompletos: number;
    cartoesAmarelos: number;
    cartoesVermelhos: number;
}
  
interface Jogador {
    numero: number;
    nome: string;
    posicao: string;
    foto: string;
    timeNome: string;
    lesoes: Lesao[];
    estatisticas: Estatistica[];
}

const Time = () => {
    const { id } = useParams(); 
    const [jogador, setJogador] = useState<Jogador | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTime = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://localhost:3005/campeonato/buscarJogadorId/${id}`);
                    if (!response.ok) {
                        throw new Error('Erro ao buscar o jogador');
                    }
                    const data: Jogador = await response.json();
                    setJogador(data);
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
    if (!jogador) return <div className="text-center text-lg">Jogador não encontrado</div>;

    return (
        <div className="flex flex-col items-center p-5 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{jogador.nome}</h1>
            <Image 
                src={'/homem.webp' } // Usando a foto do jogador
                alt={`${jogador.nome}`} 
                width={300} 
                height={200} 
                className="mb-4 rounded-lg shadow-lg object-cover"
            />
            <p className="text-xl text-gray-700 mb-4">Posição: {jogador.posicao} - Número: #{jogador.numero} - Time: {jogador.timeNome}</p>
            <h2 className="text-2xl font-semibold mb-2">Estatísticas:</h2>
            <div className="bg-white p-4 rounded shadow-md mb-4">
                <p>Gols: {jogador.estatisticas.reduce((total, stat) => total + stat.gols, 0)}</p>
                <p>Assistências: {jogador.estatisticas.reduce((total, stat) => total + stat.assistencias, 0)}</p>
                <p>Cartões Amarelos: {jogador.estatisticas.reduce((total, stat) => total + stat.cartoesAmarelos, 0)}</p>
                <p>Cartões Vermelhos: {jogador.estatisticas.reduce((total, stat) => total + stat.cartoesVermelhos, 0)}</p>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Lesões:</h2>
            <div className="bg-white p-4 rounded shadow-md">
                {jogador.lesoes.length > 0 ? (
                    <ul>
                        {jogador.lesoes.map(lesao => (
                            <li key={lesao.id} className="mb-2">
                                <p className="font-semibold">{lesao.tipoLesao} (Partida #{lesao.partidaId})</p>
                                <p>Duração Estimada: {lesao.duracaoEstimada || 'Não informada'}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Sem lesões registradas.</p>
                )}
            </div>
        </div>
    );
};

export default Time;
