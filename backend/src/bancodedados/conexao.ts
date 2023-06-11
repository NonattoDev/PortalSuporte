import conexao from "knex";

export const knex = conexao({
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
  const tableExists = await knex.schema.hasTable("colaboradores");
  if (!tableExists) {
    return knex.schema.createTable("colaboradores", (table) => {
      table.increments("id").primary();
      table.string("nome");
    });
  }
}

async function createEscalasTable() {
  const tableExists = await knex.schema.hasTable("escalas");
  if (!tableExists) {
    return knex.schema.createTable("escalas", (table) => {
      table.increments("id").primary();
      table.string("data");
      table.string("hora_inicio");
      table.string("hora_fim");
      table.integer("colaborador_id").references("id").inTable("colaboradores");
    });
  }
}

knex
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
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
}

createTables();
