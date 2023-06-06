import { Request, Response } from "express";
import { knex } from "../bancodedados/conexao";

type Escalas = {
  id: number;
  nome: string;
  data: Date;
};

export const listarEscalas = async (req: Request, res: Response) => {
  try {
    const escalas = await knex<Escalas>("escalas");

    if (escalas.length === 0) {
      return res
        .status(404)
        .json({ message: "Não existem escalas cadastradas!" });
    }

    return res.json(escalas);
  } catch {
    res.status(500).json({ message: "Erro interno de Servidor" });
  }
};
export const listarEscalasPorID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const escala = await knex<Escalas>("escalas").where({ id: Number(id) });

    if (escala.length === 0)
      return res.json({ message: "Escala não encontrada para: " + id });

    return res.json(escala);
  } catch {
    res.status(500).json({ message: "Erro interno de Servidor" });
  }
};
export const criarEscalas = async (req: Request, res: Response) => {};
export const editarEscalas = async (req: Request, res: Response) => {};
export const deletarEscalas = async (req: Request, res: Response) => {};
