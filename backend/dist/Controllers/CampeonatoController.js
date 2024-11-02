"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = exports.getCampeonato = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCampeonato = async (request, response) => {
    const { id } = request.params;
    try {
        const campeonato = await prisma.campeonato.findUnique({
            where: { id: Number(id) }
        });
        if (!campeonato) {
            return response.status(404).json({ error: "Campeonato não encontrado." });
        }
        return response.status(200).json(campeonato);
    }
    catch (error) {
        return response.status(500).json({ error: error.message });
    }
};
exports.getCampeonato = getCampeonato;
const hello = async (request, response) => {
    response.send('hello word');
};
exports.hello = hello;
