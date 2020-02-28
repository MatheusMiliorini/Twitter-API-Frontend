import React, { useState, useEffect } from 'react';
import { BACKEND_URL, TWITTER_LOGIN_BUTTON } from '../utils/consts';
import AuthFunctions from '../utils/AuthFunctions';
import './styles.css';
import Tweet from '../Tweet';

function TimeLine({ usuario, setUsuarioApp }) {
  const [saiuParaLogin, setSaiuParaLogin] = useState(false);
  const [tweets, setTweets] = useState(JSON.parse(localStorage.getItem("tweets")) || []);

  useEffect(function () {
    // Login
    window.addEventListener("focus", async function () {
      if (saiuParaLogin) {
        // Essa função sozinha já seta o state e recarrega essa página com os tweets
        await AuthFunctions.twitterVinculado(usuario, setUsuarioApp);
        setSaiuParaLogin(false);
      }
    });

    // Carrega os tweets
    if (usuario.user_id && (tweets.length === 0 || tweets.errors)) {
      AuthFunctions.getTweets(usuario).then(data => {
        setTweets(data);
        if (!data.errors) {
          localStorage.setItem("tweets", JSON.stringify(data));
        }
      });
    }
  }, []);

  return (
    <>
      {usuario.user_id && !tweets.errors &&
        tweets.map((tweet, i) => <Tweet key={i} tweet={tweet} />)
      }
      {tweets.errors &&
        <p style={{ color: 'red' }}>Erro ao buscar tweets: {tweets.errors[0].message}</p>
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