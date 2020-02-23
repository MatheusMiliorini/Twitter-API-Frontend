import React, { useState, useEffect } from 'react';
import { BACKEND_URL, TWITTER_LOGIN_BUTTON } from '../utils/consts';
import AuthFunctions from '../utils/AuthFunctions';
import './styles.css';

function TimeLine({ usuario, setUsuarioApp }) {
  const [saiuParaLogin, setSaiuParaLogin] = useState(false);
  const [tweets, setTweets] = useState([]);

  window.addEventListener("focus", async function () {
    if (saiuParaLogin)
      // Essa função sozinha já seta o state e recarrega essa página com os tweets
      await AuthFunctions.twitterVinculado(usuario, setUsuarioApp);
  });

  return (
    <>
      {usuario.user_id &&
        <p>Feed Aqui</p>
      }

      {/* Usuário não logado, mostra o botão de login com Twitter */}
      {!usuario.user_id &&
        <div className="wrapperTwitterButton">
          <a
            onClick={() => setSaiuParaLogin(true)}
            target="_blank"
            href={`${BACKEND_URL}/twitter-login?_id=${usuario._id}`}>
            <img src={TWITTER_LOGIN_BUTTON} />
          </a>
        </div>
      }
    </>
  )
}

export default TimeLine;