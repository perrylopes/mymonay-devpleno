// Componentes de Terceiros
import { useReducer, useEffect } from "react";
import axios from "axios";
axios.defaults.validateStatus = (code) => code < 500;

// Componentes Nossos

// Estilos
// Variaveis
const INITIAL_STATE = { loading: false, data: {}, error: "" };

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
  if (action.type === "FAILURE") {
    return {
      ...state,
      loading: false,
      error: action.error,
      code: action.code,
    };
  }
  return state;
};

const getAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return "?auth=" + token;
  }
  return "";
};

const init = (baseUrl) => {
  const useGet = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const carregar = async () => {
      try {
        dispatch({ type: "RESQUEST" });
        const res = await axios.get(baseUrl + resource + ".json" + getAuth());
        if (res.data.error && Object.keys(res.data.error).length > 0) {
          dispatch({
            type: "FAILURE",
            error: res.data.error,
          });
        } else {
          dispatch({ type: "SUCCESS", data: res.data });
        }
      } catch (err) {
        dispatch({ type: "FAILURE", error: "unknown erroe" });
      }
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
      const res = await axios.post(
        baseUrl + resource + ".json" + getAuth(),
        data
      );
      dispatch({ type: "SUCCESS", data: res.data });
    };

    return [data, post];
  };

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const remove = async (resource) => {
      dispatch({ type: "RESQUEST" });
      await axios.delete(baseUrl + resource + ".json" + getAuth());
      dispatch({ type: "SUCCESS" });
    };

    return [data, remove];
  };

  const usePatch = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const patch = async (data) => {
      dispatch({ type: "RESQUEST" });
      await axios.patch(baseUrl + resource + ".json" + getAuth(), data);
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

export const usePost = (resource) => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

  const post = async (data) => {
    dispatch({ type: "RESQUEST" });
    try {
      const res = await axios.post(resource, data);
      if (res.data.error && Object.keys(res.data.error).length > 0) {
        dispatch({ type: "FAILURE", error: res.data.error.message });
      } else {
        dispatch({ type: "SUCCESS", data: res.data });
        return res.data;
      }
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "FAILURE", error: "unknow error" });
    }
  };

  return [data, post];
};

export default init;
