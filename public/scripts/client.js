/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


/*
 * Helper function that appends tweets to DOM
 */
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};

/*
 * Helper function that creates tweet elements from tweets data
 */
const createTweetElement = function(tweetData) {
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

/*
 * Helper function that loads tweets from server
 */
const loadTweets = function() {
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
};


$(document).ready(function() {
  // Load the tweets from server
  loadTweets();

  // Event listener for form submit
  $("#new-tweet-form").on('submit', function(e){
    // validation code here
    e.preventDefault();
    const tweetText = $("#new-tweet-form").find("textarea").val();
    const tweetRemainingChars = $("#new-tweet-form").find("output").val();
    if (tweetText === "" || tweetText === null) {
      alert("Error: Tweet text cannot be empty!")
    } else if(tweetRemainingChars < 0) {
      alert("Error: Max character limit is exceeded!")
    } else {
      $.ajax({
        type : 'POST',
        url : "http://localhost:8080/tweets",
        data : $("#new-tweet-form").serialize()
      }).then(function () {
        $.ajax('http://localhost:8080/tweets', { method: 'GET' })
          .then(function (data) {
            let $newTweetElement = createTweetElement(data[data.length - 1]);
            $('#tweets-container').prepend($newTweetElement);
          });
      });
    }
  });
});