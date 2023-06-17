import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const urlBase = "http://localhost:3000/";

  const [data, setData] = useState("");
  const [hora_inicio, setHora_inicio] = useState("");
  const [hora_fim, setHora_fim] = useState("");
  const [colaborador_nome, setColaborador_nome] = useState("");
  const [escalas, setEscalas] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const initialData = async () => {
      try {
        const colaboradoresResponse = await axios.get(urlBase + "colaborador");
        setColaboradores(colaboradoresResponse.data);
        const escalasResponse = await axios.get(urlBase + "escala");
        setEscalas(escalasResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    initialData();
  }, []);

  const fetchData = async () => {
    try {
      const escalasResponse = await axios.get(urlBase + "escala");
      console.log(escalasResponse.data);
      setEscalas(escalasResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarEscala = async () => {
    try {
      await axios.post(urlBase + "escala/criar", {
        hora_inicio,
        data,
        hora_fim,
        colaborador_nome,
      });
      setHora_inicio("");
      setHora_fim("");
      setData("");
      setColaborador_nome("");

      await fetchData(); // Atualiza a lista de escalas após a inserção bem-sucedida
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="App">
      <h1>Adicionar Escala</h1>
      <form className="form">
        <div className="form-group">
          <label htmlFor="data">Data:</label>
          <input type="date" id="data" value={data} onChange={(event) => setData(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="hora_inicio">Inicio do Turno:</label>
          <input type="time" id="hora_inicio" value={hora_inicio} onChange={(event) => setHora_inicio(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="hora_fim">Final do turno:</label>
          <input type="time" id="hora_fim" value={hora_fim} onChange={(event) => setHora_fim(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="colaborador_nome">Colaborador:</label>
          <select id="colaborador_nome" value={colaborador_nome} onChange={(event) => setColaborador_nome(event.target.value)}>
            <option value="">Selecione um colaborador</option>
            {colaboradores.map((colaborador) => (
              <option key={colaborador.id} value={colaborador.nome}>
                {colaborador.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={adicionarEscala}>
          Adicionar
        </button>
      </form>

      <h1>Escalas</h1>
      <table className="escalas-tabela">
        <thead>
          <tr>
            <th>ID Colaborador</th>
            <th>Data</th>
            <th>Nome Colaborador</th>
            <th>Hora Início</th>
            <th>Hora Fim</th>
          </tr>
        </thead>
        <tbody>
          {escalas.map((escala) => (
            <tr key={escala.id}>
              <td>{escala.colaborador_id}</td>
              <td>{escala.data}</td>
              <td>{escala.colaborador_nome}</td>
              <td>{escala.hora_inicio}</td>
              <td>{escala.hora_fim}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
