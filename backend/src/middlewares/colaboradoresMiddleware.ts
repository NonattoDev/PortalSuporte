import { NextFunction, Request, Response } from "express";
import { knex } from "../bancodedados/conexao";
import { Colaboradores } from "../controladores/colaboradoresController";

export const criarColaboradoresMid = async (req: Request, res: Response, next: NextFunction) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ message: "Informe os dados" });
  }

  const capitalizeWords = (str: string) => {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
  };

  const nomeFormatado = capitalizeWords(nome.trim());

  let colaborador = await knex<Colaboradores>("colaboradores").where("nome", nomeFormatado).first();

  console.log(colaborador);

  if (colaborador) {
    return res.status(404).json({ message: "Usuario já cadastrado no banco de dados" });
  }

  // Converter nome para minúsculas e remover espaços do início e fim
  req.body.nome = nomeFormatado;

  return next();
};

export const editarColaboradoresMid = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  let colaborador = await knex<Colaboradores>("colaboradores").where("id", id).first();

  if (!colaborador) {
    return res.status(404).json({ message: "Colaborador não encontrado!" });
  }

  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ message: "Informe o nome do colaborador para atualizar" });
  }

  // Função para formatar as palavras com as primeiras letras maiúsculas
  const capitalizeWords = (str: string) => {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
  };

  const nomeFormatado = capitalizeWords(nome.trim());

  req.body.nome = nomeFormatado;

  return next();
};

export const deletarColaboradoresMid = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    let colaborador = await knex<Colaboradores>("colaboradores").where("id", id).first();

    if (!colaborador) {
      return res.status(404).json({ message: "Colaborador não encontrado!" });
    }

    return next();
  } catch (error) {
    return res.status(400).json({ message: "Erro interno do servidor!" });
  }
};
