import { useReducer } from "react";
import axios from "axios";

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

const useDelete = () => {
  const [data, dispatch] = useReducer(reducer, { loading: false, data: {} });
  const remove = (url) => {
    dispatch({ type: "RESQUEST" });
    axios.delete(url).then(() => {
      dispatch({ type: "SUCCESS" });
    });
  };
  return [data, remove];
};

export default useDelete;
