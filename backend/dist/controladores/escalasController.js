"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarEscalas = exports.editarEscalas = exports.criarEscalas = exports.listarEscalasPorIDDoUsuario = exports.listarEscalas = void 0;
const conexao_1 = require("../bancodedados/conexao");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const listarEscalas = async (req, res) => {
    try {
        const escalas = await (0, conexao_1.knex)("escalas")
            .join("colaboradores", "escalas.colaborador_id", "colaboradores.id")
            .select("escalas.id", "escalas.data", "escalas.hora_inicio", "escalas.hora_fim", "escalas.colaborador_id", "colaboradores.nome as colaborador_nome");
        if (escalas.length === 0) {
            return res.status(404).json({ message: "Não existem escalas cadastradas!" });
        }
        return res.json(escalas);
    }
    catch (_a) {
        res.status(500).json({ message: "Erro interno de servidor" });
    }
};
exports.listarEscalas = listarEscalas;
const listarEscalasPorIDDoUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const escalas = await (0, conexao_1.knex)("escalas")
            .join("colaboradores", "escalas.colaborador_id", "colaboradores.id")
            .select("escalas.id", "escalas.data", "escalas.hora_inicio", "escalas.hora_fim", "escalas.colaborador_id", "colaboradores.nome as colaborador_nome")
            .where("colaboradores.id", Number(id));
        if (escalas.length === 0) {
            return res.status(404).json({ message: "Não foram encontradas escalas para o colaborador especificado!" });
        }
        return res.json(escalas);
    }
    catch (_a) {
        res.status(500).json({ message: "Erro interno de Servidor" });
    }
};
exports.listarEscalasPorIDDoUsuario = listarEscalasPorIDDoUsuario;
const criarEscalas = async (req, res) => {
    const { data, hora_inicio, hora_fim, colaborador_nome } = req.body;
    const colaborador = await (0, conexao_1.knex)("colaboradores").where("nome", colaborador_nome).first();
    if (!colaborador) {
        return res.status(404).json({ message: "Usuario não encontrado!" });
    }
    let escala = {
        data: (0, date_fns_1.format)(new Date(data), "dd 'de' MMMM 'de' yyyy", { locale: locale_1.ptBR }),
        hora_inicio,
        hora_fim,
        colaborador_id: colaborador.id,
    };
    (0, conexao_1.knex)("escalas")
        .insert(escala)
        .then(() => {
        console.log("Escala inserida com sucesso!");
    })
        .catch((error) => {
        console.error("Erro ao inserir escala:", error);
    });
    return res.json(escala);
};
exports.criarEscalas = criarEscalas;
const editarEscalas = async (req, res) => {
    const { id } = req.params;
    const { data, hora_inicio, hora_fim, colaborador_id } = req.body;
    try {
        const escala = await (0, conexao_1.knex)("escalas").where("escalas.id", Number(id)).first();
        if (!escala) {
            return res.status(404).json({ message: "Escala não encontrada!" });
        }
        // Verificar e atualizar os campos individualmente, se estiverem presentes no body
        if (data) {
            escala.data = data;
        }
        if (hora_inicio) {
            escala.hora_inicio = hora_inicio;
        }
        if (hora_fim) {
            escala.hora_fim = hora_fim;
        }
        if (colaborador_id) {
            escala.colaborador_id = colaborador_id;
        }
        // Atualizar a escala no banco de dados
        await (0, conexao_1.knex)("escalas").where("escalas.id", Number(id)).update(escala);
        return res.json({ message: "Escala atualizada com sucesso!" });
    }
    catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor!" });
    }
};
exports.editarEscalas = editarEscalas;
const deletarEscalas = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, conexao_1.knex)("escalas").where("id", id).del();
        return res.json({ message: "Deletado!" });
    }
    catch (error) {
        return res.status(404).json({ message: "Erro interno de servidor!" });
    }
};
exports.deletarEscalas = deletarEscalas;
