import express from "express";
import { criarColaboradores, deletarColaboradores, editarColaboradores, listarColaboradoresPorID, listarColaboradores } from "../controladores/colaboradoresController";
import { criarColaboradoresMid, deletarColaboradoresMid, editarColaboradoresMid } from "../middlewares/colaboradoresMiddleware";

const colaboradoresRotas = express.Router();

// Listar todos os usuarios
colaboradoresRotas.get("/", listarColaboradores);

// Listar usuário por id
colaboradoresRotas.get("/:id", listarColaboradoresPorID);

// Criar um usuário
colaboradoresRotas.post("/criar", criarColaboradoresMid, criarColaboradores);

// Editar um usuário
colaboradoresRotas.put("/editar/:id", editarColaboradoresMid, editarColaboradores);

// Excluir um usuário
colaboradoresRotas.delete("/excluir/:id", deletarColaboradoresMid, deletarColaboradores);

export default colaboradoresRotas;
