$(document).ready(function() {
  $(".new-tweet-form-textarea").on('input', function() {
    // Changes the value of "output" element
    const newCounterValue = 140 - this.value.length;
    const counterElement = $(".new-tweet-form-textarea").parent().find("output");
    counterElement.val(newCounterValue);
    if (newCounterValue <= 0) {
      counterElement.removeClass("counter-black");
      counterElement.addClass("counter-red");
    } else {
      counterElement.removeClass("counter-red");
      counterElement.addClass("counter-black");
    }
  });
});