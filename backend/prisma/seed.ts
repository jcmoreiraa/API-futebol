import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const dataInicio = new Date('2024-01-01T00:00:00Z'); 
    const dataFim = new Date('2024-12-31T23:59:59Z'); 

    try {
        const seededCampeonato = await prisma.campeonato.create({
            data: {
                nome: 'Campeonato Brasileirão Série A',
                dataInicio,
                dataFim,
            }
        });

        console.log('Campeonato criado:', seededCampeonato);
    } catch (error) {
        console.error("Erro ao criar campeonato:", error);
    }
    try {
        const flamengo = await prisma.time.create({
            data: {
                nome: 'Flamengo',
                brasao: '/flamengo.png',
                estadio: 'Maracanã',
                jogadores: {
                    create: [
                        { nome: 'Rossi', posicao: 'Goleiro', numero: 1, foto: 'homem.svg' },
                        { nome: 'Arrascaeta', posicao: 'Meio-Campo', numero: 2, foto: 'homem.svg' },
                        { nome: 'Rodrigo Caio', posicao: 'Zagueiro', numero: 3, foto: 'homem.svg' },
                        { nome: 'Cleiton', posicao: 'Atacante', numero: 33, foto: 'homem.svg' },
                        { nome: 'Fabrício Bruno', posicao: 'Zagueiro', numero: 15, foto: 'homem.svg' },
                        { nome: 'Varela', posicao: 'Lateral', numero: 2, foto: 'homem.svg' }
                    ]
                }
            }
        });
    
        console.log('Time criado:', flamengo);
    } catch (error) {
        console.error("Erro ao criar time Flamengo:", error);
    }
    
    try {
        const palmeiras = await prisma.time.create({
            data: {
                nome: 'Palmeiras',
                brasao: '/palmeiras.png',
                estadio: 'Allianz Parque',
                jogadores: {
                    create: [
                        { nome: 'Estevão Willian', posicao: 'Atacante', numero: 10, foto: 'homem.svg' },
                        { nome: 'Marcos Rocha', posicao: 'Lateral', numero: 2, foto: 'homem.svg' },
                        { nome: 'Vitor Reis', posicao: 'Zagueiro', numero: 15, foto: 'homem.svg' },
                        { nome: 'Danilo', posicao: 'Meio-Campo', numero: 28, foto: 'homem.svg' },
                        { nome: 'Dudu', posicao: 'Atacante', numero: 7, foto: 'homem.svg' },
                        { nome: 'Rony', posicao: 'Atacante', numero: 11, foto: 'homem.svg' }
                    ]
                }
            }
        });
    
        console.log('Time criado:', palmeiras);
    } catch (error) {
        console.error("Erro ao criar time Palmeiras:", error);
    }
    
    try {
        const saoPaulo = await prisma.time.create({
            data: {
                nome: 'São Paulo',
                brasao: '/sao_paulo.png',
                estadio: 'Morumbi',
                jogadores: {
                    create: [
                        { nome: 'Thiago Volpi', posicao: 'Goleiro', numero: 1, foto: 'homem.svg' },
                        { nome: 'Igor Vinícius', posicao: 'Lateral', numero: 2, foto: 'homem.svg' },
                        { nome: 'Miranda', posicao: 'Zagueiro', numero: 3, foto: 'homem.svg' },
                        { nome: 'Luan', posicao: 'Meio-Campo', numero: 15, foto: 'homem.svg' },
                        { nome: 'Nikao', posicao: 'Atacante', numero: 11, foto: 'homem.svg' },
                        { nome: 'Calebe', posicao: 'Meio-Campo', numero: 28, foto: 'homem.svg' }
                    ]
                }
            }
        });
    
        console.log('Time criado:', saoPaulo);
    } catch (error) {
        console.error("Erro ao criar time São Paulo:", error);
    }
    
    try {
        const corinthians = await prisma.time.create({
            data: {
                nome: 'Corinthians',
                brasao: '/corintias.png',
                estadio: 'Itaquera',
                jogadores: {
                    create: [
                        { nome: 'Cássio', posicao: 'Goleiro', numero: 12, foto: 'homem.svg' },
                        { nome: 'Fagner', posicao: 'Lateral', numero: 23, foto: 'homem.svg' },
                        { nome: 'Gil', posicao: 'Zagueiro', numero: 4, foto: 'homem.svg' },
                        { nome: 'Gabriel', posicao: 'Meio-Campo', numero: 5, foto: 'homem.svg' },
                        { nome: 'Ramires', posicao: 'Meio-Campo', numero: 7, foto: 'homem.svg' },
                        { nome: 'Jô', posicao: 'Atacante', numero: 10, foto: 'homem.svg' }
                    ]
                }
            }
        });
    
        console.log('Time criado:', corinthians);
    } catch (error) {
        console.error("Erro ao criar time Corinthians:", error);
    }
    
    try {
        const santos = await prisma.time.create({
            data: {
                nome: 'Santos',
                brasao: '/santos.png',
                estadio: 'Vila Belmiro',
                jogadores: {
                    create: [
                        { nome: 'João Paulo', posicao: 'Goleiro', numero: 1, foto: 'homem.svg' },
                        { nome: 'Pará', posicao: 'Lateral', numero: 2, foto: 'homem.svg' },
                        { nome: 'Lucas Veríssimo', posicao: 'Zagueiro', numero: 28, foto: 'homem.svg' },
                        { nome: 'Gabriel Pirani', posicao: 'Meio-Campo', numero: 10, foto: 'homem.svg' },
                        { nome: 'Marinho', posicao: 'Atacante', numero: 11, foto: 'homem.svg' },
                        { nome: 'Kaio Jorge', posicao: 'Atacante', numero: 9, foto: 'homem.svg' }
                    ]
                }
            }
        });
    
        console.log('Time criado:', santos);
    } catch (error) {
        console.error("Erro ao criar time Santos:", error);
    }
    
    try {
        const gremio = await prisma.time.create({
            data: {
                nome: 'Grêmio',
                brasao: '/gremio.png',
                estadio: 'Arena do Grêmio',
                jogadores: {
                    create: [
                        { nome: 'Brenno', posicao: 'Goleiro', numero: 1, foto: 'homem.svg' },
                        { nome: 'Victor Ferraz', posicao: 'Lateral', numero: 2, foto: 'homem.svg' },
                        { nome: 'Pedro Geromel', posicao: 'Zagueiro', numero: 3, foto: 'homem.svg' },
                        { nome: 'Maicon', posicao: 'Meio-Campo', numero: 8, foto: 'homem.svg' },
                        { nome: 'Lucas Silva', posicao: 'Meio-Campo', numero: 16, foto: 'homem.svg' },
                        { nome: 'Diego Souza', posicao: 'Atacante', numero: 29, foto: 'homem.svg' }
                    ]
                }
            }
        });
    
        console.log('Time criado:', gremio);
    } catch (error) {
        console.error("Erro ao criar time Grêmio:", error);
    }
    
    try {
        const bahia = await prisma.time.create({
            data: {
                nome: 'Bahia',
                brasao: '/bahia.png',
                estadio: 'Arena Fonte Nova',
                jogadores: {
                    create: [
                        { nome: 'Douglas Friedrich', posicao: 'Goleiro', numero: 1, foto: 'homem.svg' },
                        { nome: 'Nino Paraíba', posicao: 'Lateral', numero: 2, foto: 'homem.svg' },
                        { nome: 'Juninho', posicao: 'Zagueiro', numero: 28, foto: 'homem.svg' },
                        { nome: 'Ronaldo', posicao: 'Meio-Campo', numero: 5, foto: 'homem.svg' },
                        { nome: 'Gilberto', posicao: 'Atacante', numero: 9, foto: 'homem.svg' },
                        { nome: 'Élber', posicao: 'Atacante', numero: 7, foto: 'homem.svg' }
                    ]
                }
            }
        });
    
        console.log('Time criado:', bahia);
    } catch (error) {
        console.error("Erro ao criar time Bahia:", error);
    }
    
    try {
        const internacional = await prisma.time.create({
            data: {
                nome: 'Internacional',
                brasao: '/internacional.png',
                estadio: 'Estádio Beira-Rio',
                jogadores: {
                    create: [
                        { nome: 'Daniel', posicao: 'Goleiro', numero: 1, foto: 'homem.svg' },
                        { nome: 'Heitor', posicao: 'Lateral', numero: 2, foto: 'homem.svg' },
                        { nome: 'Rodrigo Moledo', posicao: 'Zagueiro', numero: 3, foto: 'homem.svg' },
                        { nome: 'Edenílson', posicao: 'Meio-Campo', numero: 8, foto: 'homem.svg' },
                        { nome: 'Patrick', posicao: 'Meio-Campo', numero: 10, foto: 'homem.svg' },
                        { nome: 'Yuri Alberto', posicao: 'Atacante', numero: 7, foto: 'homem.svg' }
                    ]
                }
            }
        });
    
        console.log('Time criado:', internacional);
    } catch (error) {
        console.error("Erro ao criar time Internacional:", error);
    }
    
    try {
        const fluminense = await prisma.time.create({
            data: {
                nome: 'Fluminense',
                brasao: '/fluminense.png',
                estadio: 'Estádio do Maracanã',
                jogadores: {
                    create: [
                        { nome: 'Marcelo', posicao: 'Lateral', numero: 12, foto: 'homem.svg' },
                        { nome: 'Nino', posicao: 'Zagueiro', numero: 33, foto: 'homem.svg' },
                        { nome: 'Martinelli', posicao: 'Meio-Campo', numero: 20, foto: 'homem.svg' },
                        { nome: 'Paulo Henrique Ganso', posicao: 'Meio-Campo', numero: 10, foto: 'homem.svg' },
                        { nome: 'Luiz Henrique', posicao: 'Atacante', numero: 11, foto: 'homem.svg' },
                        { nome: 'John Kennedy', posicao: 'Atacante', numero: 7, foto: 'homem.svg' }
                    ]
                }
            }
        });
    
        console.log('Time criado:', fluminense);
    } catch (error) {
        console.error("Erro ao criar time Fluminense:", error);
    }
    
    try {
        const atletico = await prisma.time.create({
            data: {
                nome: 'Atlético Mineiro',
                brasao: '/atletico.png',
                estadio: 'Estádio Mineirão',
                jogadores: {
                    create: [
                        { nome: 'Everson', posicao: 'Goleiro', numero: 22, foto: 'homem.svg' },
                        { nome: 'Guga', posicao: 'Lateral', numero: 2, foto: 'homem.svg' },
                        { nome: 'Alcides', posicao: 'Zagueiro', numero: 3, foto: 'homem.svg' },
                        { nome: 'Hulk', posicao: 'Atacante', numero: 7, foto: 'homem.svg' },
                        { nome: 'Nathanael', posicao: 'Meio-Campo', numero: 5, foto: 'homem.svg' },
                        { nome: 'Savarino', posicao: 'Atacante', numero: 11, foto: 'homem.svg' }
                    ]
                }
            }
        });
    
        console.log('Time criado:', atletico);
    } catch (error) {
        console.error("Erro ao criar time Atlético Mineiro:", error);
    }
    

    try {
        const partida1 = await prisma.partida.create({
            data: {
                timeCasaId: 1,
                timeVisitanteId: 2,
                data: '2024-02-01T00:00:00Z',
                placarCasa: 0,
                placarVisitante: 2,
                estadio: 'Maracanã',
                arbitro: 'Anderson Daronco',
                estatisticas: {
                    create: [{
                        jogadorId: 10,
                        gols: 2,
                        cartoesAmarelos: 1
                    },
                    {
                        jogadorId: 2,
                        cartoesAmarelos: 1,
                        passesCompletos: 4
                    }]
                },
                lesoes: {
                    create: [{
                        jogadorId: 3,
                        tipoLesao: 'Arrebentou o joelho',
                        duracaoEstimada: '30 dias'
                    }]
                }
            }
        });
        console.log('Partida criada:', partida1);
    } catch (error) {
        console.error('Não foi possível criar a partida 1:', error);
    }

    try {
        const partida2 = await prisma.partida.create({
            data: {
                timeCasaId: 3,
                timeVisitanteId: 4,
                data: '2024-02-05T00:00:00Z',
                placarCasa: 1,
                placarVisitante: 3,
                estadio: 'Allianz Parque',
                arbitro: 'Marcelo de Lima Henrique',
                estatisticas: {
                    create: [
                        {
                            jogadorId: 19,
                            gols: 1,
                            cartoesAmarelos: 0,
                            passesCompletos: 3
                        },
                        {
                            jogadorId: 20,
                            gols: 2,
                            cartoesAmarelos: 1,
                            passesCompletos: 5
                        }
                    ]
                },
                lesoes: {
                    create: [{
                        jogadorId: 7,
                        tipoLesao: 'Entorse no tornozelo',
                        duracaoEstimada: '15 dias'
                    }]
                }
            }
        });
        console.log('Partida criada:', partida2);
    } catch (error) {
        console.error('Não foi possível criar a partida 2:', error);
    }

    try {
        const partida3 = await prisma.partida.create({
            data: {
                timeCasaId: 5,
                timeVisitanteId: 6,
                data: '2024-02-10T00:00:00Z',
                placarCasa: 2,
                placarVisitante: 2,
                campeonatoId: 1,
                estadio: 'Beira-Rio',
                arbitro: 'Wilton Pereira Sampaio',
                estatisticas: {
                    create: [
                        {
                            jogadorId: 26,
                            gols: 1,
                            cartoesAmarelos: 0,
                            passesCompletos: 4
                        },
                        {
                            jogadorId: 32,
                            gols: 1,
                            cartoesAmarelos: 2,
                            passesCompletos: 6
                        }
                    ]
                },
                lesoes: {
                    create: [{
                        jogadorId: 18,
                        tipoLesao: 'Lesão muscular',
                        duracaoEstimada: '20 dias'
                    }]
                }
            }
        });
        console.log('Partida criada:', partida3);
    } catch (error) {
        console.error('Não foi possível criar a partida 3:', error);
    }



    await prisma.$disconnect();
}

main().catch(e => {
    console.error('Erro no processo principal:', e);
});
