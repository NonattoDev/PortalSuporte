"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colaboradoresController_1 = require("../controladores/colaboradoresController");
const colaboradoresMiddleware_1 = require("../middlewares/colaboradoresMiddleware");
const colaboradoresRotas = express_1.default.Router();
// Listar todos os usuarios
colaboradoresRotas.get("/", colaboradoresController_1.listarColaboradores);
// Listar usuário por id
colaboradoresRotas.get("/:id", colaboradoresController_1.listarColaboradoresPorID);
// Criar um usuário
colaboradoresRotas.post("/criar", colaboradoresMiddleware_1.criarColaboradoresMid, colaboradoresController_1.criarColaboradores);
// Editar um usuário
colaboradoresRotas.put("/editar/:id", colaboradoresMiddleware_1.editarColaboradoresMid, colaboradoresController_1.editarColaboradores);
// Excluir um usuário
colaboradoresRotas.delete("/excluir/:id", colaboradoresMiddleware_1.deletarColaboradoresMid, colaboradoresController_1.deletarColaboradores);
exports.default = colaboradoresRotas;
