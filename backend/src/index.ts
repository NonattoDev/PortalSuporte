import "dotenv/config";
import express from "express";
import rotas from "./rotas/rotas";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(rotas);

app.listen(port, () => {
  console.log("Server is running on " + port);
});
