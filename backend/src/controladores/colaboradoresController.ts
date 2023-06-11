import { Request, Response } from "express";
import { knex } from "../bancodedados/conexao";

type Colaboradores = {
  id: number;
  nome: string;
};

export const listarColaboradores = async (req: Request, res: Response) => {
  try {
    const colaboradores = await knex<Colaboradores>("colaboradores");

    if (colaboradores.length === 0) {
      return res.status(404).json({ message: "Não existem colaboradores cadastrados" });
    }

    return res.json(colaboradores);
  } catch (error) {
    res.status(500).json({ message: "Erro interno de Servidor" });
  }
};
export const listarColaboradoresPorID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const colaboradores = await knex<Colaboradores>("colaboradores").where("id", id);

    if (colaboradores.length === 0) {
      return res.status(404).json({ message: "Não existe colaborador cadastrador com esse id" });
    }

    return res.json(colaboradores);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno de Servidor" });
  }
};
export const criarColaboradores = async (req: Request, res: Response) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ message: "Informe os dados" });
  }
  try {
    const colaborador = await knex<Omit<Colaboradores, "id">>("colaboradores")
      .insert({
        nome,
      })
      .returning("*");

    return res.status(201).json(colaborador);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno de Servidor" });
  }
};
export const editarColaboradores = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { nome } = req.body;

  try {
    await knex<Omit<Colaboradores, "id">>("colaboradores").update({ nome }).where("id", id);

    const colaboradorAtualizado = await knex<Colaboradores>("colaboradores")
      .where({
        id: Number(id),
      })
      .first();

    return res.json(colaboradorAtualizado);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno de Servidor" });
  }
};
export const deletarColaboradores = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const colaborador = await knex<Colaboradores>("colaboradores").where("id", id).del();

    if (!colaborador) {
      return res.status(404).json({ message: "Usuario não existe" });
    }

    return res.json({ message: "Colaborador deletado" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno de Servidor" });
  }
};
