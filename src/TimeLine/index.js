import React, { useState, useEffect } from 'react';
import { BACKEND_URL, TWITTER_LOGIN_BUTTON } from '../utils/consts';
import AuthFunctions from '../utils/AuthFunctions';
import './styles.css';
import Tweet from '../Tweet';
import api from '../utils/api';
import { Link } from 'react-router-dom';

function TimeLine({ usuario, setUsuarioApp }) {
  const [saiuParaLogin, setSaiuParaLogin] = useState(false);
  const [tweets, setTweets] = useState(JSON.parse(localStorage.getItem("tweets")) || []);

  // Login
  useEffect(function () {
    if (saiuParaLogin) {
      window.addEventListener("focus", async function () {
        await AuthFunctions.twitterVinculado(usuario, setUsuarioApp);
        setSaiuParaLogin(false);
        atualizaFeed();
      });
    }
  }, [saiuParaLogin]);


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

  // Deleta tweet
  async function del(tweet) {
    const { id_str } = tweet;
    const res = await api.delete(`/tweet/${usuario._id}/${id_str}`);
    if (res.status === 200)
      atualizaFeed();
  }

  return (
    <>
      {usuario.user_id && !tweets.errors &&
        <>
          {/* Botão de reload */}
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
            fav={fav}
            del={del} />)}

          {/* Botão de criar tweet */}
          <Link
            to="/createTweet"
            className="btnTweet">
            <button>
              <i className="fas fa-feather-alt"></i> +
            </button>
          </Link>
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