"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarColaboradores = exports.editarColaboradores = exports.criarColaboradores = exports.listarColaboradoresPorID = exports.listarColaboradores = void 0;
const conexao_1 = require("../bancodedados/conexao");
const listarColaboradores = async (req, res) => {
    try {
        const colaboradores = await (0, conexao_1.knex)("colaboradores");
        if (colaboradores.length === 0) {
            return res.status(404).json({ message: "Não existem colaboradores cadastrados" });
        }
        return res.json(colaboradores);
    }
    catch (error) {
        res.status(500).json({ message: "Erro interno de Servidor" });
    }
};
exports.listarColaboradores = listarColaboradores;
const listarColaboradoresPorID = async (req, res) => {
    const { id } = req.params;
    try {
        const colaboradores = await (0, conexao_1.knex)("colaboradores").where("id", id);
        if (colaboradores.length === 0) {
            return res.status(404).json({ message: "Não existe colaborador cadastrador com esse id" });
        }
        return res.json(colaboradores);
    }
    catch (error) {
        return res.status(500).json({ message: "Erro interno de Servidor" });
    }
};
exports.listarColaboradoresPorID = listarColaboradoresPorID;
const criarColaboradores = async (req, res) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ message: "Informe os dados" });
    }
    try {
        const colaborador = await (0, conexao_1.knex)("colaboradores")
            .insert({
            nome,
        })
            .returning("*");
        return res.status(201).json(colaborador);
    }
    catch (error) {
        return res.status(500).json({ message: "Erro interno de Servidor" });
    }
};
exports.criarColaboradores = criarColaboradores;
const editarColaboradores = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        await (0, conexao_1.knex)("colaboradores").update({ nome }).where("id", id);
        const colaboradorAtualizado = await (0, conexao_1.knex)("colaboradores")
            .where({
            id: Number(id),
        })
            .first();
        return res.json(colaboradorAtualizado);
    }
    catch (error) {
        return res.status(500).json({ message: "Erro interno de Servidor" });
    }
};
exports.editarColaboradores = editarColaboradores;
const deletarColaboradores = async (req, res) => {
    const { id } = req.params;
    try {
        const colaborador = await (0, conexao_1.knex)("colaboradores").where("id", id).del();
        if (!colaborador) {
            return res.status(404).json({ message: "Usuario não existe" });
        }
        return res.json({ message: "Colaborador deletado" });
    }
    catch (error) {
        return res.status(500).json({ message: "Erro interno de Servidor" });
    }
};
exports.deletarColaboradores = deletarColaboradores;
