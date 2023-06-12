"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const escalasRotas_1 = __importDefault(require("./escalasRotas"));
const colaboradoresRotas_1 = __importDefault(require("./colaboradoresRotas"));
const _404middleware_1 = require("../middlewares/404middleware");
const rotas = (0, express_1.default)();
rotas.use("/escala", escalasRotas_1.default);
rotas.use("/colaborador", colaboradoresRotas_1.default);
rotas.use("/", _404middleware_1.rotaDesconhecida);
exports.default = rotas;
