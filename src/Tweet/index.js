import React from 'react';
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Tweet({ tweet, rt, fav }) {
    return (
        <div className="tweet">
            <div className="divProfileImg">
                <img src={tweet.user.profile_image_url_https} alt={tweet.user.description} />
            </div>
            <div>
                <span className="twitterUsername">{tweet.user.name} <span className="arroba">@{tweet.user.screen_name}</span></span>
                <span className="tweetText">{tweet.text}</span>
                <div className="tweetFooter">
                    <span><i onClick={rt} className={`fas fa-retweet hover hover-green ${tweet.retweeted ? "bold" : ""}`}></i> {tweet.retweet_count}</span>
                    <span><i onClick={(e) => fav(tweet, e)} className={`${tweet.favorited ? "fas" : "far"} hover hover-red fa-heart`} ></i> {tweet.favorite_count}</span>
                </div>
            </div>
        </div>
    )
}

export default Tweet;