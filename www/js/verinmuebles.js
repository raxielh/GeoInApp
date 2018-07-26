$(function()
{
  cargar()
});

function cargar(){
  $('#fondo_load').show();
  $('#load').show();
  $('#inf').hide();
  //console.log(getParameterByName('id'));

  //$('#fondo_load').show();
  //$('#load').show();
  /*
  return firebase.database().ref('/Clientes/').once('value').then(function(snapshot) {

    console.log(snapshot.val());

  });
  */

  return firebase.database().ref('/Clientes/').once('value').then(function(snapshot) {

    obj=snapshot.val();

    Object.keys(obj).forEach(function(key){

      return firebase.database().ref('/Clientes/'+key).once('value').then(function(snapshot) {

          obj2=snapshot.val();

          Object.keys(obj2).forEach(function(key2){
            
            var telefono=(obj2[key2].telefono);

            obj3=obj2[key2].inmueble;

            Object.keys(obj3).forEach(function(key3){

              console.log(key3);
            
              if(key3==getParameterByName('id')){
                var id=key3;

                return firebase.database().ref('/Clientes/'+key+'/'+key2+'/inmueble/'+key3).once('value').then(function(snapshot) {

                  console.log(snapshot.val());

                  map(snapshot.val().lat,snapshot.val().lon);

                  $('#descripcion').html('<h5>Descripcion</h5><p>'+snapshot.val().descripcion+'</p>');
                  $('#precio').html('$ '+snapshot.val().precio);
                  $('#especificaciones').html('<h5>Especificaciones</h5><p>'+
                    '<strong>Dirección</strong> '+snapshot.val().direccion+'<br>'+
                    '<strong>Tipo inmueble</strong> '+snapshot.val().tipo_inmueble+'<br>'+
                    '<strong>Tipo negocio</strong> '+snapshot.val().tipo_negocio+'<br>'+
                    '<strong>Metros Cuadrados</strong> '+snapshot.val().mts+'<br>'+
                    '<strong>Barrio</strong> '+snapshot.val().barrio+'<br>'+
                    '<strong>Habitaciones</strong> '+snapshot.val().habitaciones+'<br>'+
                    '<strong>Baños</strong> '+snapshot.val().banos+'<br>'+
                    '<strong>Garaje</strong> '+snapshot.val().garaje+'<br>'+
                    '<strong>Antiguedad</strong> '+snapshot.val().antiguedad+'<br>'+
                    '</p>');

                  $('#inf').show();
                  
                  $("#tel").attr("href",'tel:'+telefono)

                });




              }

            });


          });

      });



    });

  });

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function map(lat,lon) {
  var url='https://maps.googleapis.com/maps/api/staticmap?center='+lat+','+lon+'&zoom=16&size=600x300&maptype=roadmap&markers=color:orange%7Clabel:I%7C'+lat+','+lon+'&key=AIzaSyBcuL57fE7kGODVpu6TsoFRFR2kaIr5LWw';
  $('#mapa').attr('src',url);
  $('#fondo_load').hide();
  $('#load').hide();
}

