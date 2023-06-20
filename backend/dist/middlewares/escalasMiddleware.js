"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarEscalaMid = void 0;
const criarEscalaMid = (req, res, next) => {
    const { data, hora_fim, hora_inicio, colaborador_nome } = req.body;
    if (!data || !hora_fim || !colaborador_nome || !hora_inicio) {
        return res.status(400).json({ message: "Informe todos os campos!" });
    }
    return next();
};
exports.criarEscalaMid = criarEscalaMid;
//# sourceMappingURL=escalasMiddleware.js.map