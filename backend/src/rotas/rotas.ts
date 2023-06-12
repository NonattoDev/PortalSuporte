import express from "express";
import escalaRotas from "./escalasRotas";
import colaboradoresRotas from "./colaboradoresRotas";
import { rotaDesconhecida } from "../middlewares/404middleware";

const rotas = express();

rotas.use("/escala", escalaRotas);
rotas.use("/colaborador", colaboradoresRotas);
rotas.use("/", rotaDesconhecida);

export default rotas;
