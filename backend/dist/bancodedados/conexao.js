"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
const knex_1 = __importDefault(require("knex"));
exports.knex = (0, knex_1.default)({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PSDW,
        database: process.env.DB_DATABASE,
    },
});
async function createColaboradoresTable() {
    const tableExists = await exports.knex.schema.hasTable("colaboradores");
    if (!tableExists) {
        return exports.knex.schema.createTable("colaboradores", (table) => {
            table.increments("id").primary();
            table.string("nome");
        });
    }
}
async function createEscalasTable() {
    const tableExists = await exports.knex.schema.hasTable("escalas");
    if (!tableExists) {
        return exports.knex.schema.createTable("escalas", (table) => {
            table.increments("id").primary();
            table.string("data");
            table.string("hora_inicio");
            table.string("hora_fim");
            table.integer("colaborador_id").references("id").inTable("colaboradores");
        });
    }
}
exports.knex
    .raw("SELECT 1")
    .then(() => {
    console.log("Conexão bem-sucedida com o banco de dados!");
})
    .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});
async function createTables() {
    try {
        await createColaboradoresTable();
        await createEscalasTable();
        console.log("Tabelas criadas com sucesso!");
    }
    catch (error) {
        console.error("Erro ao criar tabelas:", error);
    }
}
createTables();
//# sourceMappingURL=conexao.js.map