import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";

import { useMovimentcaoApi } from "../../api";
import InfoMes from "./infoMes";
import AdicionarMovimentacao from "./AdicionarMovimentacao";

const Movimentacao = ({ match }) => {
  const {
    movimentacoes,
    salvarNovaMovimentacao,
    removerMovimentacao,
  } = useMovimentcaoApi(match.params.data);

  const salvarMovimentacao = async (dados) => {
    await salvarNovaMovimentacao(dados);
    movimentacoes.refetch();
    // infoMes.refetch();
  };

  const removerMovimentacaoClick = async (id) => {
    await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`);
    movimentacoes.refetch();
    // infoMes.refetch();
  };

  if (movimentacoes.error === "Permission denied") {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container">
      <h1>Movimentação</h1>
      <InfoMes data={match.params.data} />
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoes.data &&
            Object.keys(movimentacoes.data).map((movimentacao) => {
              return (
                <tr key={movimentacao}>
                  <td>{movimentacoes.data[movimentacao].descricao}</td>
                  <td>{movimentacoes.data[movimentacao].valor}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removerMovimentacaoClick(movimentacao)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              );
            })}
          <AdicionarMovimentacao salvarNovMovimentacao={salvarMovimentacao} />
        </tbody>
      </table>
    </div>
  );
};

export default Movimentacao;
