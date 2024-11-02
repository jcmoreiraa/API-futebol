"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CampeonatoController_1 = require("../Controllers/CampeonatoController");
const campeonatoRouter = (0, express_1.Router)();
exports.default = campeonatoRouter;
campeonatoRouter.get('/buscar', CampeonatoController_1.getCampeonato);
campeonatoRouter.get('/', CampeonatoController_1.hello);
