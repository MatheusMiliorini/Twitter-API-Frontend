import React from 'react';
import './styles.css';

function Tweet({ tweet }) {
    return (
        <div className="tweet">
            <p className="twitterUsername">{tweet.user.name}</p>
            <img src={tweet.user.profile_image_url_https} alt={tweet.user.description} />
            <p className="tweetText">{tweet.text}</p>
            <div className="tweetFooter">
                <span>{tweet.retweet_count}</span>
                <span>{tweet.favorite_count}</span>
            </div>
        </div>
    )
}

export default Tweet;