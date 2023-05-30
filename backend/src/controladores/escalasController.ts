import { Request, Response } from "express";

export const listarEscalas = async (req: Request, res: Response) => {
  res.send("listar todos os colabs");
};
export const listarEscalasPorID = async (req: Request, res: Response) => {};
export const criarEscalas = async (req: Request, res: Response) => {};
export const editarEscalas = async (req: Request, res: Response) => {};
export const deletarEscalas = async (req: Request, res: Response) => {};
