/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};

/*
 * Helper function that creates tweet elements from tweets data
 */
const createTweetElement = function (tweetData) {
  const $tweet = $(`<article>
      <div class="tweet-card-header">
        <div class="tweet-card-header-avatar-name">
        <img src=${tweetData.user.avatars} class="tweet-card-avatar">
          <span>${tweetData.user.name}</span>
        </div>          
        <span class="tweet-card-user-handle">${tweetData.user.handle}</span>
      </div>
      <p class="tweet-card-content">${tweetData.content.text}</p>
      <hr class="tweet-card-break">
      <div class="tweet-card-footer">
        <span>${timeago.format(tweetData.created_at)}</span>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </article>`);
  return $tweet;
};

$(document).ready(function() {
  // Test / driver code (temporary)
  renderTweets(data);

  // Event listener for form submit
  $("#new-tweet-form").on('submit', function(e){
    // validation code here
    e.preventDefault();
    $.ajax({
      type : 'POST',
      url : "http://localhost:8080/tweets",
      data : $("#new-tweet-form").serialize()
    });    
  });
});