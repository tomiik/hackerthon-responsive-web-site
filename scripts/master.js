$(function() {
  $('.skill-box-inner').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if(isInView){
      $(this).stop().addClass('skill-box-animation');
    }
    else{
      $(this).stop().removeClass('skill-box-animation');
    }
  });

  $('h1').click(function() {
    $('html,body').animate({scrollTop: $(document).height()}, 500, 'swing');
  });
});
