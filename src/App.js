import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import './App.css';
import PrivateRoute from './PrivateRoute';
import TimeLine from './TimeLine';
import FormLoginCadastro from './FormLoginCadastro';
import AuthFunctions from './utils/AuthFunctions';

function App() {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario")) || {});

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <FormLoginCadastro
            txtBtn="Login"
            outroLink={{ url: "/cadastro", nome: "Não tenho conta" }}
            onSubmit={AuthFunctions.login}
            setUsuarioApp={setUsuario} />
        </Route>

        <Route exact path="/cadastro">
          <FormLoginCadastro
            txtBtn="Cadastrar"
            outroLink={{ url: "/login", nome: "Já tenho conta" }}
            onSubmit={AuthFunctions.cadastro}
            setUsuarioApp={setUsuario} />
        </Route>

        <PrivateRoute exact path="/timeline" usuario={usuario}>
          <TimeLine
            setUsuarioApp={setUsuario}
            usuario={usuario} />
        </PrivateRoute>

        <Route
          exact path="/"
          render={() => <Redirect to={usuario._id ? "/timeline" : "/login"} />} />

        <Route path="*" render={() => <p>Página não encontrada!</p>} />
      </Switch>
    </Router>
  );
}

export default App;
