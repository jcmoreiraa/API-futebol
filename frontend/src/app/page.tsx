"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Carrossel } from "./components/carrossel";

interface Time {
  id: number;
  nome: string;
  estadio?: string;
  brasao?: string;
}

interface Jogador {
  id: number;
  nome: string;
  posicao: string;
}

interface Estatistica {
  jogadorId: number;
  gols: number;
  cartoesAmarelos: number;
  assistencias: number;
}

interface Lesao {
  jogadorId: number;
  tipoLesao: string;
  duracaoEstimada: string;
}

export default function Times() {
  const [times, setTimes] = useState<Time[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<Time[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [estatisticas, setEstatisticas] = useState<Estatistica[]>([]);
  const [lesoes, setLesoes] = useState<Lesao[]>([]);
  const [placarCasa, setPlacarCasa] = useState<number>(0);
  const [placarVisitante, setPlacarVisitante] = useState<number>(0);
  const [jogadores, setJogadores] = useState<Jogador[][]>([]);

  const [dataPartida, setDataPartida] = useState<string>("2024-02-10T00:00:00Z");
  const [estadioPartida, setEstadioPartida] = useState<string>("Beira-Rio");
  const [arbitroPartida, setArbitroPartida] = useState<string>("Wilton Pereira Sampaio");

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await fetch("http://localhost:3005/campeonato/TodosTimes");
        const data = await response.json();
        if (data.times) {
          setTimes(data.times);
        }
      } catch (error) {
        console.error("Erro ao buscar times:", error);
        setError("Erro ao carregar os times. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimes();
  }, []);

  const fetchJogadores = async (timeId: number) => {
    try {
      const response = await fetch(`http://localhost:3005/campeonato/buscarTime/${timeId}`);
      const data = await response.json();
      return data.jogadores || [];
    } catch (error) {
      console.error(`Erro ao buscar jogadores do time ${timeId}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllJogadores = async () => {
      if (selectedTimes.length === 2) {
        const jogadoresTimeCasa = await fetchJogadores(selectedTimes[0].id);
        const jogadoresTimeVisitante = await fetchJogadores(selectedTimes[1].id);
        setJogadores([jogadoresTimeCasa, jogadoresTimeVisitante]);
      }
    };

    fetchAllJogadores();
  }, [selectedTimes]);

  const handleTimeClick = (time: Time) => {
    setSelectedTimes((prevSelected) => {
      if (prevSelected.find((t) => t.id === time.id)) {
        return prevSelected.filter((t) => t.id !== time.id);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, time];
      }
      return prevSelected;
    });
  };

  const handleEstatisticaChange = (jogadorId: number, field: keyof Estatistica, value: number) => {
    setEstatisticas((prevEstatisticas) => {
      const existingEstatistica = prevEstatisticas.find((e) => e.jogadorId === jogadorId);

      if (existingEstatistica) {
        const updatedEstatistica = {
          ...existingEstatistica,
          [field]: value,
        };
        return prevEstatisticas.map((estatistica) =>
          estatistica.jogadorId === jogadorId ? updatedEstatistica : estatistica
        );
      } else {
        return [
          ...prevEstatisticas,
          {
            jogadorId,
            gols: 0,
            cartoesAmarelos: 0,
            assistencias: 0,
            [field]: value,
          },
        ];
      }
    });
  };

  const handleLesaoChange = (jogadorId: number, tipoLesao: string, isDuracao: boolean = false) => {
    if (isDuracao) {
      setLesoes((prevLesoes) => {
        const existingLesaoIndex = prevLesoes.findIndex((l) => l.jogadorId === jogadorId);
        const updatedLesoes = [...prevLesoes];
        
        if (existingLesaoIndex !== -1) {
          updatedLesoes[existingLesaoIndex].duracaoEstimada = tipoLesao; // Atualiza a duração
        } else {
          updatedLesoes.push({ jogadorId, tipoLesao: '', duracaoEstimada: tipoLesao }); // Adiciona nova lesão com duração
        }
        
        return updatedLesoes;
      });
    } else {
      setLesoes((prevLesoes) => {
        const existingLesaoIndex = prevLesoes.findIndex((l) => l.jogadorId === jogadorId);
        const updatedLesoes = [...prevLesoes];
        
        if (existingLesaoIndex !== -1) {
          updatedLesoes[existingLesaoIndex].tipoLesao = tipoLesao; // Atualiza o tipo de lesão
        } else {
          updatedLesoes.push({ jogadorId, tipoLesao, duracaoEstimada: '' }); // Adiciona nova lesão sem duração
        }
        
        return updatedLesoes;
      });
    }
  };

  const handleCreateGame = async () => {
    const formattedData = new Date(dataPartida).toISOString();

    if (selectedTimes.length === 2) {
      const partidaData = {
        timeCasaId: selectedTimes[0].id,
        timeVisitanteId: selectedTimes[1].id,
        data: formattedData,
        placarCasa,
        placarVisitante,
        campeonatoId: 1,
        estadio: estadioPartida,
        arbitro: arbitroPartida,
        estatisticas,
        lesoes,
      };

      try {
        const response = await fetch("http://localhost:3005/campeonato/createPartida", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(partidaData),
        });

        if (!response.ok) {
          throw new Error("Erro ao criar a partida");
        }

        const result = await response.json();
        console.log("Partida criada com sucesso:", result);
        setSelectedTimes([]);
        setEstatisticas([]);
        setLesoes([]);
        setPlacarCasa(0);
        setPlacarVisitante(0);
      } catch (error) {
        console.error("Erro:", error);
        setError("Erro ao criar a partida. Tente novamente.");
      }
    }
  };

  if (loading) {
    return <div className="text-xl">Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
      <Carrossel />
      <h1 className="text-4xl font-bold mb-5 text-gray-800">Criar Partida</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {times.map((time) => (
          <div
            key={time.id}
            className={`bg-white shadow-lg rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 ${selectedTimes.find((t) => t.id === time.id) ? "border-2 border-blue-500 bg-blue-100" : ""}`}
            onClick={() => handleTimeClick(time)}
          >
            <div className="flex items-center mb-4">
              {time.brasao && (
                <Image
                  src={time.brasao}
                  alt={`${time.nome} logo`}
                  width={50}
                  height={40}
                  className="mr-3"
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

      {selectedTimes.length === 2 && (
        <div className="mt-5 flex justify-between w-full max-w-7xl bg-white shadow-lg rounded-lg p-12">
          <div className=" w-1/2 pr-2">
            <h2 className="text-2xl font-bold mb-3">{selectedTimes[0].nome}</h2>
            <ul>
              {jogadores[0]?.map((jogador) => (
                <li key={jogador.id} className="mb-2 flex items-center space-x-4">
                  <span className="font-medium">{jogador.nome} - {jogador.posicao}</span>
                  <input
                    type="number"
                    placeholder="Gols"
                    onChange={(e) => handleEstatisticaChange(jogador.id, 'gols', Number(e.target.value))}
                    className="w-16 border border-gray-300 rounded p-1 text-sm bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
                  />
                  <input
                    type="number"
                    placeholder="Cartões"
                    onChange={(e) => handleEstatisticaChange(jogador.id, 'cartoesAmarelos', Number(e.target.value))}
                    className="w-16 border border-gray-300 rounded p-1 text-sm bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
                  />
                  <input
                    type="number"
                    placeholder="Passes"
                    onChange={(e) => handleEstatisticaChange(jogador.id, 'assistencias', Number(e.target.value))}
                    className="w-16 border border-gray-300 rounded p-1 text-sm bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
                  />
                  <input
                    type="text"
                    placeholder="Lesão"
                    onBlur={(e) => handleLesaoChange(jogador.id, e.target.value, )}
                    className="w-24 border border-gray-300 rounded p-1 text-sm bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
                  />
                   <input
              type="text"
              placeholder="Duração"
              onChange={(e) => handleLesaoChange(jogador.id, e.target.value, true)} // Passando true para indicar que é a duração
              className="w-24 border border-gray-300 rounded p-1 text-sm bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
            />
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/2 pl-2">
            <h2 className="text-2xl font-bold mb-3">{selectedTimes[1].nome}</h2>
            <ul>
              {jogadores[1]?.map((jogador) => (
                <li key={jogador.id} className="mb-2 flex items-center space-x-4">
                  <span className="font-medium">{jogador.nome} - {jogador.posicao}</span>
                  <input
                    type="number"
                    placeholder="Gols"
                    onChange={(e) => handleEstatisticaChange(jogador.id, 'gols', Number(e.target.value))}
                    className="w-16 border border-gray-300 rounded p-1 text-sm bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
                  />
                  <input
                    type="number"
                    placeholder="Cartões"
                    onChange={(e) => handleEstatisticaChange(jogador.id, 'cartoesAmarelos', Number(e.target.value))}
                    className="w-16 border border-gray-300 rounded p-1 text-sm bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
                  />
                  <input
                    type="number"
                    placeholder="Passes"
                    onChange={(e) => handleEstatisticaChange(jogador.id, 'assistencias', Number(e.target.value))}
                    className="w-16 border border-gray-300 rounded p-1 text-sm bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
                  />
                  <input
                    type="text"
                    placeholder="Lesão"
                    onBlur={(e) => handleLesaoChange(jogador.id, e.target.value)}
                    className="w-24 border border-gray-300 rounded p-1 text-sm bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
                  />
                  <input
              type="text"
              placeholder="Duração"
              onChange={(e) => handleLesaoChange(jogador.id, e.target.value, true)} // Passando true para indicar que é a duração
              className="w-24 border border-gray-300 rounded p-1 text-sm bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
            />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedTimes.length === 2 && (
        <div className="mt-5 bg-white shadow-lg rounded-lg p-4 w-full max-w-4xl">
          <h3 className="text-xl font-bold mb-2">Dados da Partida</h3>
          <input
            type="datetime-local"
            value={dataPartida}
            onChange={(e) => setDataPartida(e.target.value)}
            className="block mb-2 p-2 border border-gray-300 rounded bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
          />
          <input
            type="text"
            placeholder="Estádio"
            value={estadioPartida}
            onChange={(e) => setEstadioPartida(e.target.value)}
            className="block mb-2 p-2 border border-gray-300 rounded bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
          />
          <input
            type="text"
            placeholder="Árbitro"
            value={arbitroPartida}
            onChange={(e) => setArbitroPartida(e.target.value)}
            className="block mb-4 p-2 border border-gray-300 rounded bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
          />
          
          <div className="flex space-x-4 mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Placar Casa</label>
              <input
                type="number"
                value={placarCasa}
                onChange={(e) => setPlacarCasa(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Placar Visitante</label>
              <input
                type="number"
                value={placarVisitante}
                onChange={(e) => setPlacarVisitante(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded bg-blue-50 focus:bg-blue-100 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <button
            onClick={handleCreateGame}
            className="bg-blue-600 text-white px-4 py-2 rounded transition hover:bg-blue-700"
          >
            Criar Partida
          </button>
        </div>
      )}
    </div>
  );
}
