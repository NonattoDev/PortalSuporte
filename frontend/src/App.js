import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FormEscala from "./components/formularioEscala/FormEscala.js";
import TabelaEscalas from "./components/tabelaEscala/TabelaEscalas.js";
import { getColaboradores, getEscalas, criarEscala } from "./api";
import Home from "./components/homePage/Home";

function App() {
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [colaboradorNome, setColaboradorNome] = useState("");
  const [escalas, setEscalas] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const initialData = async () => {
      try {
        const colaboradoresData = await getColaboradores();
        setColaboradores(colaboradoresData);

        const escalasData = await getEscalas();
        setEscalas(escalasData);
      } catch (error) {
        console.error(error);
      }
    };

    initialData();
  }, []);

  const fetchData = async () => {
    try {
      const escalasData = await getEscalas();
      setEscalas(escalasData);
      console.log(escalasData);
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarEscala = async () => {
    try {
      await criarEscala({
        hora_inicio: horaInicio,
        data,
        hora_fim: horaFim,
        colaborador_nome: colaboradorNome,
      });

      setHoraInicio("");
      setHoraFim("");
      setData("");
      setColaboradorNome("");

      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/escalas"
            element={
              <div>
                <FormEscala
                  data={data}
                  horaInicio={horaInicio}
                  horaFim={horaFim}
                  colaboradorNome={colaboradorNome}
                  colaboradores={colaboradores}
                  setData={setData}
                  setHoraInicio={setHoraInicio}
                  setHoraFim={setHoraFim}
                  setColaboradorNome={setColaboradorNome}
                  adicionarEscala={adicionarEscala}
                />

                <TabelaEscalas escalas={escalas} />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
