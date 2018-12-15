
$(function()  {

  // debounce scroll handler
  // handly scroll every
  var SCROLL_INTERVAL = 400; // ms

  var hasScrolled = true;
  $(window).scroll(function() {
    hasScrolled = true;
  })

  setInterval(function() {
    if (!hasScrolled) return;

    revealQuestions();
    hasScrolled = false;

  }, SCROLL_INTERVAL);

  function revealQuestions() {
    var scrollPos = $(document).scrollTop();
    var windowHeight = $(window).height();

    $(".question").each(function(){
      var questionPosition = $(this).offset().top;

      if (questionPosition < scrollPos + windowHeight*0.33) {
        $(this).addClass("active");
      }
    });
  }
});
