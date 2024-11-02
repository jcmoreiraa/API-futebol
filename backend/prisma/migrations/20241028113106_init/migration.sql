-- CreateTable
CREATE TABLE "Campeonato" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campeonato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "estadio" TEXT,
    "brasao" TEXT,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partida" (
    "id" SERIAL NOT NULL,
    "timeCasaId" INTEGER NOT NULL,
    "timeVisitanteId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "placarCasa" INTEGER NOT NULL,
    "placarVisitante" INTEGER NOT NULL,
    "campeonatoId" INTEGER NOT NULL DEFAULT 1,
    "estadio" TEXT,
    "arbitro" TEXT,

    CONSTRAINT "Partida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "posicao" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "timeNome" TEXT NOT NULL,

    CONSTRAINT "Jogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstatisticasJogador" (
    "id" SERIAL NOT NULL,
    "jogadorId" INTEGER NOT NULL,
    "partidaId" INTEGER NOT NULL,
    "gols" INTEGER NOT NULL DEFAULT 0,
    "assistencias" INTEGER NOT NULL DEFAULT 0,
    "passesCompletos" INTEGER NOT NULL DEFAULT 0,
    "cartoesAmarelos" INTEGER NOT NULL DEFAULT 0,
    "cartoesVermelhos" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EstatisticasJogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesao" (
    "id" SERIAL NOT NULL,
    "jogadorId" INTEGER NOT NULL,
    "partidaId" INTEGER NOT NULL,
    "tipoLesao" TEXT NOT NULL,
    "duracaoEstimada" TEXT,

    CONSTRAINT "Lesao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Time_nome_key" ON "Time"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "EstatisticasJogador_jogadorId_partidaId_key" ON "EstatisticasJogador"("jogadorId", "partidaId");

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_timeCasaId_fkey" FOREIGN KEY ("timeCasaId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_timeVisitanteId_fkey" FOREIGN KEY ("timeVisitanteId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogador" ADD CONSTRAINT "Jogador_timeNome_fkey" FOREIGN KEY ("timeNome") REFERENCES "Time"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstatisticasJogador" ADD CONSTRAINT "EstatisticasJogador_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstatisticasJogador" ADD CONSTRAINT "EstatisticasJogador_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "Partida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesao" ADD CONSTRAINT "Lesao_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesao" ADD CONSTRAINT "Lesao_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "Partida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
