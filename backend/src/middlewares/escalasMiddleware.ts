import { NextFunction, Request, Response } from "express";

export const criarEscalaMid = (req: Request, res: Response, next: NextFunction) => {
  const { data, hora_fim, hora_inicio, colaborador_nome } = req.body;

  if (!data || !hora_fim || !colaborador_nome || !hora_inicio) {
    return res.status(400).json({ message: "Informe todos os campos!" });
  }

  return next();
};
