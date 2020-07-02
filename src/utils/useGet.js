import { useEffect, useReducer } from "react";
import axios from "axios";

const reducer = (state, action) => {
  // Manupular o estado
  if (action.type === "RESQUEST") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "SUCESS") {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }
  return state;
};

const useGet = (url) => {
  const [data, dispatch] = useReducer(reducer, { loading: true, data: {} });
  useEffect(() => {
    dispatch({ type: "REQUEST" });
    axios.get(url).then((res) => {
      dispatch({ type: "SUCESS", data: res.data });
      // setData({
      //   loading: false,
      //   data: res.data,
      // });
    });
  }, []);
  return data;
};

export default useGet;
