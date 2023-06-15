"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarColaboradoresMid = exports.editarColaboradoresMid = exports.criarColaboradoresMid = void 0;
const conexao_1 = require("../bancodedados/conexao");
const criarColaboradoresMid = async (req, res, next) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ message: "Informe os dados" });
    }
    const capitalizeWords = (str) => {
        return str.toLowerCase().replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
    };
    const nomeFormatado = capitalizeWords(nome.trim());
    let colaborador = await (0, conexao_1.knex)("colaboradores").where("nome", nomeFormatado).first();
    console.log(colaborador);
    if (colaborador) {
        return res.status(404).json({ message: "Usuario já cadastrado no banco de dados" });
    }
    // Converter nome para minúsculas e remover espaços do início e fim
    req.body.nome = nomeFormatado;
    return next();
};
exports.criarColaboradoresMid = criarColaboradoresMid;
const editarColaboradoresMid = async (req, res, next) => {
    const { id } = req.params;
    let colaborador = await (0, conexao_1.knex)("colaboradores").where("id", id).first();
    if (!colaborador) {
        return res.status(404).json({ message: "Colaborador não encontrado!" });
    }
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ message: "Informe o nome do colaborador para atualizar" });
    }
    // Função para formatar as palavras com as primeiras letras maiúsculas
    const capitalizeWords = (str) => {
        return str.toLowerCase().replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
    };
    const nomeFormatado = capitalizeWords(nome.trim());
    req.body.nome = nomeFormatado;
    return next();
};
exports.editarColaboradoresMid = editarColaboradoresMid;
const deletarColaboradoresMid = async (req, res, next) => {
    const { id } = req.params;
    try {
        let colaborador = await (0, conexao_1.knex)("colaboradores").where("id", id).first();
        if (!colaborador) {
            return res.status(404).json({ message: "Colaborador não encontrado!" });
        }
        return next();
    }
    catch (error) {
        return res.status(400).json({ message: "Erro interno do servidor!" });
    }
};
exports.deletarColaboradoresMid = deletarColaboradoresMid;
