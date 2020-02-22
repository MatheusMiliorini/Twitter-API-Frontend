import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import './App.css';
import PrivateRoute from './PrivateRoute';
import FormLoginCadastro from './FormLoginCadastro';
import AuthFunctions from './utils/AuthFunctions';

function App() {
  const [usuario, setUsuario] = useState({});

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <FormLoginCadastro
            txtBtn="Login"
            outroLink={{ url: "/cadastro", nome: "Não tenho conta" }}
            onSubmit={AuthFunctions.login}
            setUsuarioApp={setUsuario} />
        </Route>

        <Route path="/cadastro">
          <FormLoginCadastro
            txtBtn="Cadastrar"
            outroLink={{ url: "/login", nome: "Já tenho conta" }}
            onSubmit={AuthFunctions.cadastro}
            setUsuarioApp={setUsuario} />
        </Route>

        <Route path="/" render={() => <Redirect to={usuario._id ? "/timeline" : "/login"} />} />

        <PrivateRoute path="/timeline" usuario={usuario}>
          <div>
            Pão :)
          </div>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
