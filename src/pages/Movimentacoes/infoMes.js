import React from "react";

import { useMesApi } from "../../api";

const InfoMes = ({ data }) => {
  const { infoMes, alterarMes } = useMesApi(data);
  const alterarPrevisaoEntrada = (evt) => {
    alterarMes({ previsao_entrada: evt.target.value });
  };
  const alterarPrevisaoSaida = (evt) => {
    alterarMes({ previsao_saida: evt.target.value });
  };

  if (infoMes.loading) {
    return <p>Carregando dados do Mês...</p>;
  }
  if (infoMes.data) {
    return (
      <div>
        Previsão entrada: {infoMes.data.previsao_entrada}{" "}
        <input type="text" onBlur={alterarPrevisaoEntrada} /> / Previsão de
        Saída: {infoMes.data.previsao_saida}{" "}
        <input type="text" onBlur={alterarPrevisaoSaida} /> <br />
        Entradas: {infoMes.data.entradas} / Saidas: {infoMes.data.saidas}
      </div>
    );
  }
  return null;
};

export default InfoMes;
