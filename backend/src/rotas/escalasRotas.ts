import { Router } from "express";
import {
  criarEscalas,
  deletarEscalas,
  editarEscalas,
  listarEscalasPorID,
} from "../controladores/escalasController";

const escalaRotas = Router();

// Listar todas as escalas
escalaRotas.get("/");
// Criar escala para um usuário
escalaRotas.post("/:id", criarEscalas);
// Listar escalas de um usuário
escalaRotas.get("/:id", listarEscalasPorID);
// Editar escala de um usuário
escalaRotas.put("/:", editarEscalas);
// Excluir a escala de um usuário
escalaRotas.delete("/:id", deletarEscalas);

export default escalaRotas;
