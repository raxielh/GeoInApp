$(function()
{
  $("body").fadeIn(2000);
 var contador = 1;
 
  $('.menu').click(function(){
    $('nav').toggle();

    if(contador == 1){
      $('nav').animate({
        left: '0',
        display:'block'
      });
      contador = 0;
    } else {
      contador = 1;
      $('nav').animate({
        left: '-100%',
        display:'none'
      });
    }
 
  });


 
});

