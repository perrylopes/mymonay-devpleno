import React from "react";
import { useState } from "react";

const AdicionarMovimentacao = ({ salvarNovMovimentacao }) => {
  // Gestao Form
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const onChangeDescricao = (evt) => {
    setDescricao(evt.target.value);
  };
  const onChangeValor = (evt) => {
    setValor(evt.target.value);
  };

  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvarNovMovimentacao({
        descricao,
        valor: parseFloat(valor),
      });
      setDescricao("");
      setValor("");
    }
  };

  return (
    <tr>
      <td>
        <input type="text" value={descricao} onChange={onChangeDescricao} />
      </td>
      <td>
        <input type="text" value={valor} onChange={onChangeValor} />
      </td>
      <td>
        <button className="btn btn-success" onClick={salvarMovimentacao}>
          +
        </button>
      </td>
    </tr>
  );
};

export default AdicionarMovimentacao;
