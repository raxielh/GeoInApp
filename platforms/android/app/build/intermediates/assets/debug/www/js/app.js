$(function()
{
 var contador = 1;
 
  $('.menu_bar').click(function(){
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

