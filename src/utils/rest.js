// Componentes de Terceiros
import { useReducer, useEffect } from "react";
import axios from "axios";

// Componentes Nossos

// Estilos
// Variaveis
const INITIAL_STATE = { loading: false, data: {} };

// funcão
const reducer = (state, action) => {
  // Manupular o estado
  if (action.type === "RESQUEST") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "SUCCESS") {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }
  return state;
};

const init = (baseUrl) => {
  const useGet = (resource) => {
    console.log(baseUrl + resource + ".json");
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const carregar = async () => {
      dispatch({ type: "RESQUEST" });
      const res = await axios.get(baseUrl + resource + ".json");
      dispatch({ type: "SUCCESS", data: res.data });
    };

    useEffect(() => {
      carregar();
    }, [resource]);

    return {
      ...data,
      refetch: carregar,
    };
  };

  const usePost = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const post = async (data) => {
      dispatch({ type: "RESQUEST" });
      const res = await axios.post(baseUrl + resource + ".json", data);
      dispatch({ type: "SUCCESS", data: res.data });
    };

    return [data, post];
  };

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const remove = async (resource) => {
      dispatch({ type: "RESQUEST" });
      await axios.delete(baseUrl + resource + ".json");
      dispatch({ type: "SUCCESS" });
    };

    return [data, remove];
  };

  const usePatch = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const patch = async (resource, data) => {
      dispatch({ type: "RESQUEST" });
      await axios.patch(baseUrl + resource + ".json", data);
      dispatch({ type: "SUCCESS" });
    };

    return [data, patch];
  };

  return {
    useGet,
    usePost,
    useDelete,
    usePatch,
  };
};

export default init;
