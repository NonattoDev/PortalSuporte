"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const escalasController_1 = require("../controladores/escalasController");
const escalaRotas = (0, express_1.Router)();
// Criar escala para um usuário
escalaRotas.post("/criar/", escalasController_1.criarEscalas);
// Editar escala de um usuário
escalaRotas.put("/edit/:id", escalasController_1.editarEscalas);
// Excluir a escala de um usuário
escalaRotas.delete("/delete/:id", escalasController_1.deletarEscalas);
// Listar escalas de um usuário
escalaRotas.get("/:id", escalasController_1.listarEscalasPorIDDoUsuario);
// Listar todas as escalas
escalaRotas.get("/", escalasController_1.listarEscalas);
exports.default = escalaRotas;
