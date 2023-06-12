"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colaboradoresController_1 = require("../controladores/colaboradoresController");
const colaboradoresRotas = express_1.default.Router();
// Listar usuário por id
colaboradoresRotas.get("/:id", colaboradoresController_1.listarColaboradoresPorID);
// Criar um usuário
colaboradoresRotas.post("/", colaboradoresController_1.criarColaboradores);
// Criar um usuário
colaboradoresRotas.put("/:id", colaboradoresController_1.editarColaboradores);
// Excluir um usuário
colaboradoresRotas.delete("/:id", colaboradoresController_1.deletarColaboradores);
// Listar todos os usuarios
colaboradoresRotas.get("/", colaboradoresController_1.listarColaboradores);
exports.default = colaboradoresRotas;
