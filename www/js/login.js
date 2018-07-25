firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    location.href ="home.html";
  }
});

$(function()
{
  
  $('.ingresar').click(function(event)
  {

    var user = $('#user').val();
    var pass = $('#pass').val();

    
    firebase.auth().signInWithEmailAndPassword(user, pass).catch(function(error)
    {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      $('#error_msg').show();
      $('#error_msg').text("error al ingresar tus datos");

    });

  });

});
