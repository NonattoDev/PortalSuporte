import React from "react";

function TabelaEscalas({ escalas }) {
  return (
    <div>
      <h2>Escalas</h2>
      <table className="escalas-tabela">
        <thead>
          <tr>
            <th>ID Colaborador</th>
            <th>Dia da semana</th>
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
              <td>{escala.dia}</td>
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

export default TabelaEscalas;
