$(function()
{
  cargar()
});
function ver(id){
  location.href ="verinmueble.html?id="+id;
}
function cargar(){
  //var userId = firebase.auth().currentUser.uid;
        $('#fondo_load').show();
        $('#load').show();

  $('#fondo_load').show();
  $('#load').show();
  firebase.auth().onAuthStateChanged(function(user) {
  
  if (user) {
      var userId=(user.uid);
      return firebase.database().ref('/Clientes/' + userId).once('value').then(function(snapshot) {

        obj=snapshot.val();

        //console.log(Object.keys(obj));

        Object.keys(obj).forEach(function(key) {

          var inmuebles=obj[key].inmueble;

          //console.log(inmuebles);

          if(inmuebles){
            $('#i').hide();
          
        
            Object.keys(inmuebles).forEach(function(key2) {

              //console.log(Object.keys(inmuebles)[x]);
            

              if(inmuebles[key2].tipo_inmueble=='Apartamento'){
                var icon='<img src="img/i1.png" width=30px; style="padding-right: 10px;" />';
              }
              if(inmuebles[key2].tipo_inmueble=='Casa'){
                var icon='<img src="img/i2.png" width=30px; style="padding-right: 10px;" />';
              }
              if(inmuebles[key2].tipo_inmueble=='Lote'){
                var icon='<img src="img/i3.png" width=40px; style="padding-right: 10px;" />';
              }
              var funcion="ver('"+key2+"')";
              $('#listado').append( '<li onclick="'+funcion+'"><div class="row"><div class="col-9">'+icon+ inmuebles[key2].direccion +'</div><div class="col-3"><i class="material-icons">accessibility_new</i><span style="font-size: 20px;font-weight:bold">0</span></div></div></li>' );
            
            });


          }else{
            $('#i').show();
            $('#i').text('No Tienes Inmuebles creados...');
          }

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

