$(function()
{
  cargar()
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

        console.log(Object.keys(obj)[0]);
        


      });
    }
  });
  /*
  return firebase.database().ref('/Clientes/' + userId).once('value').then(function(snapshot) {
    console.log(snapshot);
  });
  */
}