import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { useHistory, Link } from 'react-router-dom';

function FormLoginCadastro({ txtBtn, outroLink, onSubmit, setUsuarioApp }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  
  // Usado para fazer redirect
  const history = useHistory();
  
  return (
    <div className="container">
      <div className="col-12 col-md-6 offset-md-3">
        <form>
          <div className="form-group">
            <label>Usuário</label>
            <input
              className="form-control"
              value={usuario}
              onChange={e => setUsuario(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={e => setSenha(e.target.value)} />
          </div>

          <button
            style={{ width: "100%" }}
            className="btn btn-success"
            type="button"
            disabled={usuario.length === 0 || senha.length === 0}
            onClick={() => onSubmit(usuario, senha, setUsuarioApp, history)}>
            {txtBtn}
          </button>

          <Link to={outroLink.url}>{outroLink.nome}</Link>
        </form>
      </div>
    </div>
  )
}

export default FormLoginCadastro;