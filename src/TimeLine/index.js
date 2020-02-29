import React, { useState, useEffect } from 'react';
import { BACKEND_URL, TWITTER_LOGIN_BUTTON } from '../utils/consts';
import AuthFunctions from '../utils/AuthFunctions';
import './styles.css';
import Tweet from '../Tweet';
import api from '../utils/api';

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
      atualizaFeed();
    }
  }, []);

  function atualizaFeed() {
    AuthFunctions.getTweets(usuario)
      .then(data => {
        if (!data.errors) {
          setTweets(data);
          localStorage.setItem("tweets", JSON.stringify(data));
        }
      })
      .catch(e => {
        if (e.errors)
          alert(`Erro: ${e.errors[0].message}`);
        else
          alert("Ocorreu um erro desconhecido ao buscar os tweets");
      });
  }

  async function rt(tweet) {
    try {
      const endpoint = tweet.retweeted ? "/unretweet" : "/retweet";

      const { data } = await api.post(`${BACKEND_URL}${endpoint}`, {
        _id: usuario._id,
        id: tweet.id_str
      });

      if (data.errors) {
        alert(`Ocorreu um erro: "${data.errors[0].message}"`);
      } else {
        // Data é o tweet retornado atualizado
        const novosTweets = tweets.map(_tweet => {
          if (tweet.id_str === _tweet.id_str) {
            // Assim porque a API é confusa e não retona o tweet certo
            _tweet.retweeted = !_tweet.retweeted;
            _tweet.retweet_count += _tweet.retweeted ? 1 : -1;
          }
          return _tweet;
        });

        setTweets(novosTweets);
        localStorage.setItem("tweets", JSON.stringify(novosTweets));
      }
    } catch (e) {
      alert("Ocorreu um erro!");
    }
  }

  async function fav(tweet) {
    try {
      const endpoint = tweet.favorited ? "/unfav" : "/fav";

      const { data } = await api.post(`${BACKEND_URL}${endpoint}`, {
        _id: usuario._id,
        id: tweet.id_str
      });

      if (data.errors) {
        alert(`Ocorreu um erro: "${data.errors[0].message}"`);
      } else {
        // Data é o tweet retornado atualizado
        const novosTweets = tweets.map(_tweet => {
          if (_tweet.id_str === data.id_str)
            return data;
          else
            return _tweet;
        });

        setTweets(novosTweets);
        localStorage.setItem("tweets", JSON.stringify(novosTweets));
      }
    } catch (e) {
      alert("Ocorreu um erro!");
    }
  }

  return (
    <>
      {usuario.user_id && !tweets.errors &&
        <>
          <div className="divBtnReloadFeed">
            <button
              className="btn btnReloadFeed"
              title="Recarregar feed"
              onClick={atualizaFeed}>
              <i className="fas fa-sync"></i>
            </button>
          </div>

          {/* Lista todos os tweets */}
          {tweets.map((tweet, i) => <Tweet
            key={i}
            tweet={tweet}
            rt={rt}
            fav={fav} />)}
        </>
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