import Rest from "../utils/rest";

const baseUrl = "https://mymonay-devpleno.firebaseio.com/";
const { useGet, usePost, useDelete, usePatch } = Rest(baseUrl);

export const useMesApi = (data) => {
  const infoMes = useGet(`meses/${data}`);
  const [dataPatch, alterarMes] = usePatch(`meses/${data}`);
  return {
    infoMes,
    alterarMes,
  };
};

export const useMovimentcaoApi = (data) => {
  const movimentacoes = useGet(`movimentacoes/${data}`);
  const [postData, salvarNovaMovimentacao] = usePost(`movimentacoes/${data}`);
  const [removerData, removerMovimentacao] = useDelete("");
  return {
    movimentacoes,
    salvarNovaMovimentacao,
    removerMovimentacao,
  };
};
