$(function()
{
  
  $('.registrarse').click(function(event)
  {

    var email = $('#user').val();
    var password = $('#pass').val();

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        var user = firebase.auth().currentUser;
        console.log(user.uid);
        var database = firebase.database();
        var referencia = database.ref('Clientes/'+user.uid);  
    
        var add =  referencia.push({
          nombre: $('#nombres').val(),
          apellidos: $('#apellidos').val(),
          telefono: $('#telefono').val(),
        });

        setTimeout(function(){ location.href ="home.html" }, 2000);
        //location.href ="home.html";

    }, function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        $('#error_msg').show();
        switch(errorCode) {
            case "auth/invalid-email":
                var msg=("Ingrese un Correo valido");
                break;
            case "auth/weak-password":
                var msg=("Contraseña con minimo 6 caracteres");
                break;
            case "auth/email-already-in-use":
                var msg=("Correo en uso");
                break;
            default:
                console.log(1);
        }
        $('#error_msg').text(msg);
    });






  });

});


function save_cliente()
{

  var database = firebase.database();
  var referencia = database.ref('Datos');  
    
  var add =  referencia.push({
    nombre: $('#nombres').val(),
  });

}