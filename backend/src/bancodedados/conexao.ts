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

knex
  .raw("SELECT 1")
  .then(() => {
    console.log("Conexão bem-sucedida com o banco de dados!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
