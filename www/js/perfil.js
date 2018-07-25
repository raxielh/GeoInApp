$(function()
{
  cargar()
  $('.save_perfil').click(function(event)
  {

   





  });

});

function cargar(){
  //var userId = firebase.auth().currentUser.uid;
  firebase.auth().onAuthStateChanged(function(user) {
  
  if (user) {
      var userId=(user.uid);
      return firebase.database().ref('/Clientes/' + userId).once('value').then(function(snapshot) {
        obj=snapshot.val();

        Object.keys(obj).forEach(function(key) {

          console.log(obj[key]);

          $('#nombres').val(obj[key].nombre);
          $('#apellidos').val(obj[key].apellidos);
          $('#telefono').val(obj[key].telefono);

        });

      });
    }
  });
  /*
  return firebase.database().ref('/Clientes/' + userId).once('value').then(function(snapshot) {
    console.log(snapshot);
  });
  */
}