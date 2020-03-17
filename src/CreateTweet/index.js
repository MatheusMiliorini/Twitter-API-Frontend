import React from 'react';
import { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../utils/api';

function CreateTweet({ usuario }) {
  const [tweet, setTweet] = useState("");
  const history = useHistory();

  async function postTweet() {
    if (tweet.trim() !== "") {
      const res = await api.post("/tweet", {
        _id: usuario._id,
        tweet
      });
      history.push("/timeline");
    }
  }

  return (
    <>
      <div className="barraSuperior">
        <Link to="/timeline">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <button
          onClick={postTweet}
          className={tweet.trim() !== "" ? "habilitado" : ""}>
          Tweetar
        </button>
      </div>

      <textarea
        autoFocus="yes"
        onChange={(e) => setTweet(e.target.value)}
        className="textAreaTweet" placeholder="O que está acontecendo?">
      </textarea>
    </>
  )
}

export default CreateTweet;