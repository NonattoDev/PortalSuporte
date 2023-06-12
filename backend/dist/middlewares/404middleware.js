"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotaDesconhecida = void 0;
const rotaDesconhecida = (req, res, next) => {
    return res.json({ message: "Ops, está perdido ? , Página não encontrada!" });
};
exports.rotaDesconhecida = rotaDesconhecida;
