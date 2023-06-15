import { Router } from "express";
import { criarEscalas, deletarEscalas, editarEscalas, listarEscalas, listarEscalasPorIDDoUsuario } from "../controladores/escalasController";
import { criarEscalaMid } from "../middlewares/escalasMiddleware";

const escalaRotas = Router();

// Criar escala para um usuário
escalaRotas.post("/criar/", criarEscalaMid, criarEscalas);
// Editar escala de um usuário
escalaRotas.put("/edit/:id", editarEscalas);
// Excluir a escala de um usuário
escalaRotas.delete("/delete/:id", deletarEscalas);
// Listar escalas de um usuário
escalaRotas.get("/:id", listarEscalasPorIDDoUsuario);
// Listar todas as escalas
escalaRotas.get("/", listarEscalas);

export default escalaRotas;
