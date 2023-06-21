import axios from "axios";

const urlBase = "https://possuporteapi.onrender.com/";

export const getColaboradores = async () => {
  try {
    const response = await axios.get(urlBase + "colaborador");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEscalas = async () => {
  try {
    const response = await axios.get(urlBase + "escala");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const criarEscala = async (data) => {
  try {
    await axios.post(urlBase + "escala/criar", data);
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};
