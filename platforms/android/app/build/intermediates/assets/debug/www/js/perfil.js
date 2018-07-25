$(function()
{
  cargar()
  $('#save_perfil').click(function(event)
  {

  $.confirm({
      title: 'Confirmar!',
      content: 'Estas seguro de actualuzar tus datos?',
      buttons: {
          confirmar: function () {
            $('#fondo_load').show();
            $('#load').show();

                var nombre = $('#nombres').val();
                var uid = $('#uid').val();
                var apellidos= $('#apellidos').val();
                var telefono= $('#telefono').val();
                

                var database = firebase.database();
                var user = firebase.auth().currentUser;
                var referencia = database.ref('Clientes/'+user.uid+'/'+uid);
                console.log(referencia);

                    var add =  referencia.set({
                      nombre: $('#nombres').val(),
                      apellidos: $('#apellidos').val(),
                      telefono: $('#telefono').val(),
                    }).then(function() {
                      $('#fondo_load').hide();
                      $('#load').hide();
                    });
          },
          cancelar: function () {
          }
      }
  });
    


  });

});

function cargar(){
  //var userId = firebase.auth().currentUser.uid;
  $('#fondo_load').show();
  $('#load').show();
  firebase.auth().onAuthStateChanged(function(user) {
  
  if (user) {
      var userId=(user.uid);
      return firebase.database().ref('/Clientes/' + userId).once('value').then(function(snapshot) {

        

        obj=snapshot.val();
        
        Object.keys(obj).forEach(function(key) {

          

          $('#nombres').val(obj[key].nombre);
          $('#apellidos').val(obj[key].apellidos);
          $('#telefono').val(obj[key].telefono);
          $('#uid').val(Object.keys(obj)[0]);


        });

          $('#fondo_load').hide();
          $('#load').hide();

      });
    }
  });
  /*
  return firebase.database().ref('/Clientes/' + userId).once('value').then(function(snapshot) {
    console.log(snapshot);
  });
  */
}