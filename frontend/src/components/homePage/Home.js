import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h2>Tela Inicial</h2>
      <div className="logo-container">
        <img
          src="https://media.licdn.com/dms/image/C4E0BAQGwfUHtSIspOw/company-logo_200_200/0/1532460463000?e=2147483647&v=beta&t=ub9p4UHskcdr-GfBGBUkaKKcvh2rzj60W2rI6HhNxeg"
          alt="POS SUPORTE"
          className="logo"
        />
      </div>
      <Link to="/escalas" className="link">
        Ver Tabela de Escalas
      </Link>
      <Link to="/criarColaborador" className="link">
        Criar Colaborador
      </Link>
    </div>
  );
}

export default Home;
