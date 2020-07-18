import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./elements/Header";
import Home from "./pages/Home";
import Movimentacao from "./pages/Movimentacoes";
import Login from "./pages/Login";

// funcao pura
function App() {
  // const data = useGet("movimentacao/2020-05");
  // const [postData, post] = usePost("movimentacao/2020-05");
  // const [deleteData, remove] = useDelete();

  return (
    <Router>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/movimentacoes/:data" exact component={Movimentacao} />
    </Router>
  );
}

export default App;
