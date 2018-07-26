$(function()
{
  cargar()
});

function cargar(){
  $('#fondo_load').show();
  $('#load').show();

  return firebase.database().ref('/Clientes/').once('value').then(function(snapshot) {
    obj=snapshot.val();

    Object.keys(obj).forEach(function(key){
      return firebase.database().ref('/Clientes/'+key).once('value').then(function(snapshot) {
          obj2=snapshot.val();

          Object.keys(obj2).forEach(function(key2){
            var telefono=(obj2[key2].telefono);
            obj3=obj2[key2].inmueble;
            
            Object.keys(obj3).forEach(function(key3){
                var ff=firebase.database().ref('/Clientes/'+key+'/'+key2+'/inmueble/'+key3).once('value').then(function(snapshot) {
                  //console.log(snapshot.val().lat+' '+snapshot.val().lon);
                  //features=[{position: new google.maps.LatLng(snapshot.val().lat,snapshot.val().lon

                  if(snapshot.val().tipo_inmueble=='Apartamento'){
                    var icon='<img src="img/i1.png" width=30px; style="padding-right: 10px;" />';
                  }
                  if(snapshot.val().tipo_inmueble=='Casa'){
                    var icon='<img src="img/i2.png" width=30px; style="padding-right: 10px;" />';
                  }
                  if(snapshot.val().tipo_inmueble=='Lote'){
                    var icon='<img src="img/i3.png" width=40px; style="padding-right: 10px;" />';
                  }
                  
                  var funcion="ver('"+key3+"')";
                  $('#listado').append( '<li onclick="'+funcion+'"><div class="row"><div class="col-10">'+icon+ snapshot.val().direccion +'</div><div class="col-2"><i class="material-icons">star_border</i></div></div></li>' );
                  $('#fondo_load').hide();
                  $('#load').hide();
            

                });
                
            });

          });

      });
    });
  });  

}

function ver(id){
  location.href ="verinmueble2.html?id="+id;
}