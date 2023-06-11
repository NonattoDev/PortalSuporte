import express from "express";
import { criarColaboradores, deletarColaboradores, editarColaboradores, listarColaboradoresPorID, listarColaboradores } from "../controladores/colaboradoresController";

const colaboradoresRotas = express.Router();

// Listar usuário por id
colaboradoresRotas.get("/:id", listarColaboradoresPorID);

// Criar um usuário
colaboradoresRotas.post("/", criarColaboradores);

// Criar um usuário
colaboradoresRotas.put("/:id", editarColaboradores);

// Excluir um usuário
colaboradoresRotas.delete("/:id", deletarColaboradores);

// Listar todos os usuarios
colaboradoresRotas.get("/", listarColaboradores);

export default colaboradoresRotas;
