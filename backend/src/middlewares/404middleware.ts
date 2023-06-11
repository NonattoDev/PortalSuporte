import { NextFunction, Request, Response } from "express";

export const rotaDesconhecida = (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "Ops, está perdido ? , Página não encontrada!" });
};
