'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Jogador {
    timeNome: string;
    id: number;
    nome: string;
    posicao: string;
    foto: string; 
}

const JogadoresList = () => {
    const router = useRouter(); 
    const [jogadores, setJogadores] = useState<Jogador[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJogadores = async () => {
            try {
                const response = await fetch('http://localhost:3005/campeonato/todosJogadores');
                if (!response.ok) {
                    throw new Error('Erro ao buscar jogadores');
                }
                const data = await response.json();
                setJogadores(data.jogadores);
            } catch (error) {
                console.error(error); 
                setError(error instanceof Error ? error.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchJogadores();
    }, []);

    if (loading) return <p className="text-center">Carregando...</p>;
    if (error) return <p className="text-red-500 text-center">Erro: {error}</p>;

    const handleTimeClick = (id: number) => {
        router.push(`/jogador/${id}`); 
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-4 mt-10">Lista de Jogadores</h1>
            <div className="p-4 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl">
                    {jogadores.map(jogador => (
                        <div 
                            key={jogador.id} 
                            onClick={() => handleTimeClick(jogador.id)} 
                            className="flex items-center p-2 border border-gray-200 rounded cursor-pointer"
                        >
                            <Image
                                src={'/homem.webp'}
                                alt={jogador.nome}
                                width={50}
                                height={50}
                                className="rounded-full mr-3 border border-gray-300" 
                            />
                            <div>
                                <span className="font-semibold">{jogador.nome}</span><br />
                                <span className="text-gray-600">{jogador.posicao}</span><br />
                                <span className="text-gray-600">{jogador.timeNome}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default JogadoresList;
