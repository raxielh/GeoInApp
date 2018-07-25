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

  $(".menu_bar").on('swiperight',function (e,data){
      $('nav').animate({
        left: '0',
        display:'block'
      });
      contador = 0;
  });
 
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      $('#m_correo').text(user.email);
    }
    
  }else{
    location.href ="entrar.html";
  }
});

function salir(){
  $.confirm({
      title: 'Confirmar!',
      content: 'Estas seguro de cerrar sesion!',
      buttons: {
          confirmar: function () {
            firebase.auth().signOut().then(function(){
                location.href ="entrar.html";
            }).catch(function(error){

            });
          },
          cancelar: function () {
          }
      }
  });
}