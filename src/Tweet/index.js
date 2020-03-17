import React from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Tweet({ tweet, rt, fav, del }) {
  const meuID = JSON.parse(localStorage.getItem("usuario")).user_id;

  return (
    <div className="tweet">
      <div className="divProfileImg">
        <img src={tweet.user.profile_image_url_https} alt={tweet.user.description} />
      </div>
      <div>
        <span className="twitterUsername">{tweet.user.name} <span className="arroba">@{tweet.user.screen_name} {moment(tweet.created_at).fromNow(true)}</span></span>
        <span className="tweetText">{tweet.text}</span>
        <div className="tweetFooter">
          <span><i onClick={() => rt(tweet)} className={`fas fa-retweet hover hover-green ${tweet.retweeted ? "green" : ""}`}></i> {tweet.retweet_count}</span>
          <span><i onClick={(e) => fav(tweet, e)} className={`${tweet.favorited ? "fas red" : "far"} hover hover-red fa-heart`} ></i> {tweet.favorite_count}</span>
          {tweet.user.id == meuID &&
            <span><i title="Deletar Tweet" onClick={() => del(tweet)} className="delete far fa-trash-alt" ></i></span>
          }
        </div>
      </div>
    </div>
  )
}

export default Tweet;