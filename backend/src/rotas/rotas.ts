import express from "express";
import escalaRotas from "./escalasRotas";
import colaboradoresRotas from "./colaboradoresRotas";

const rotas = express();

rotas.use("/escala", escalaRotas);
rotas.use("/colaborador", colaboradoresRotas);

export default rotas;
