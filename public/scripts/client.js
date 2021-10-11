/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
 * Helper function that escape unsecure text
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      <p class="tweet-card-content">${escape(tweetData.content.text)}</p>
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
    e.preventDefault();
    // Hide error message
    let errorMessage = $("#error-message");
    errorMessage.slideUp();
    // Validation
    const tweetText = $("#new-tweet-form").find("textarea").val();
    const tweetRemainingChars = $("#new-tweet-form").find("output").val();
    if (tweetText === "" || tweetText === null) {
      // Show error message
      errorMessage.find("span").text("Error: Tweet text cannot be empty!");
      errorMessage.slideDown();
    } else if(tweetRemainingChars < 0) {
      // Show error message
      errorMessage.find("span").text("Error: Max character limit is exceeded!");
      errorMessage.slideDown();
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