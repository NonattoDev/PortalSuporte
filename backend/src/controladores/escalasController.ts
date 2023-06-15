import { Request, Response } from "express";
import { knex } from "../bancodedados/conexao";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Escalas = {
  id: number;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  colaborador_nome: string;
  colaborador_id: number;
};

export const listarEscalas = async (req: Request, res: Response) => {
  try {
    const escalas = await knex<Escalas>("escalas")
      .join("colaboradores", "escalas.colaborador_id", "colaboradores.id")
      .select("escalas.id", "escalas.data", "escalas.hora_inicio", "escalas.hora_fim", "escalas.colaborador_id", "escalas.dia", "colaboradores.nome as colaborador_nome");

    return res.json(escalas);
  } catch {
    res.status(500).json({ message: "Erro interno de servidor" });
  }
};

export const listarEscalasPorIDDoUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const escalas = await knex<Escalas>("escalas")
      .join("colaboradores", "escalas.colaborador_id", "colaboradores.id")
      .select("escalas.id", "escalas.data", "escalas.hora_inicio", "escalas.hora_fim", "escalas.colaborador_id", "colaboradores.nome as colaborador_nome")
      .where("colaboradores.id", Number(id));

    if (escalas.length === 0) {
      return res.status(404).json({ message: "Não foram encontradas escalas para o colaborador especificado!" });
    }

    return res.json(escalas);
  } catch {
    res.status(500).json({ message: "Erro interno de Servidor" });
  }
};
export const criarEscalas = async (req: Request, res: Response) => {
  const { data, hora_inicio, hora_fim, colaborador_nome } = req.body;

  const colaborador = await knex<Escalas>("colaboradores").where("nome", colaborador_nome).first();

  if (!colaborador) {
    return res.status(404).json({ message: "Usuario não encontrado!" });
  }

  let escala = {
    data: format(new Date(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
    dia: format(new Date(data), "eeee", { locale: ptBR }).charAt(0).toUpperCase() + format(new Date(data), "eeee", { locale: ptBR }).slice(1),
    hora_inicio,
    hora_fim,
    colaborador_id: colaborador.id,
  };

  knex<Omit<Escalas, "id">>("escalas")
    .insert(escala)
    .then(() => {
      console.log("Escala inserida com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao inserir escala:", error);
    });

  return res.json(escala);
};
export const editarEscalas = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, hora_inicio, hora_fim, colaborador_id } = req.body;

  try {
    const escala = await knex<Escalas>("escalas").where("escalas.id", Number(id)).first();

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
    await knex<Escalas>("escalas").where("escalas.id", Number(id)).update(escala);

    return res.json({ message: "Escala atualizada com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};
export const deletarEscalas = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await knex<Escalas>("escalas").where("id", id).del();
    return res.json({ message: "Deletado!" });
  } catch (error) {
    return res.status(404).json({ message: "Erro interno de servidor!" });
  }
};
