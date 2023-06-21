import React from "react";

function FormEscala({ data, horaInicio, horaFim, colaboradorNome, colaboradores, setData, setHoraInicio, setHoraFim, setColaboradorNome, adicionarEscala }) {
  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const handleHoraInicioChange = (event) => {
    setHoraInicio(event.target.value);
  };

  const handleHoraFimChange = (event) => {
    setHoraFim(event.target.value);
  };

  const handleColaboradorNomeChange = (event) => {
    setColaboradorNome(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    adicionarEscala();
  };

  return (
    <div>
      <h2>Adicionar Escala</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="data">Data:</label>
          <input type="date" id="data" value={data} onChange={handleDataChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hora_inicio">Inicio do Turno:</label>
          <input type="time" id="hora_inicio" value={horaInicio} onChange={handleHoraInicioChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hora_fim">Final do turno:</label>
          <input type="time" id="hora_fim" value={horaFim} onChange={handleHoraFimChange} />
        </div>
        <div className="form-group">
          <label htmlFor="colaborador_nome">Colaborador:</label>
          <select id="colaborador_nome" value={colaboradorNome} onChange={handleColaboradorNomeChange}>
            <option value="">Selecione um colaborador</option>
            {colaboradores.map((colaborador) => (
              <option key={colaborador.id} value={colaborador.nome}>
                {colaborador.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default FormEscala;
