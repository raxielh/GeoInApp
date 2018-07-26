var map; 
carga();
  $('#fondo_load').show();
  $('#load').show();
function initMap(marcadores)
{
    $('#fondo_load').hide();
  $('#load').hide();

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 8.756917, lng: -75.879524},
    zoom:14 
  });

 var infowindow = new google.maps.InfoWindow();
        for (i = 0; i < marcadores.length; i++) {

          if(marcadores[i][4]=='Apartamento'){
            var ico='./img/i11.png';
          }
          if(marcadores[i][4]=='Casa'){
            var ico='./img/i22.png';
          }
          if(marcadores[i][4]=='Lote'){
            var ico='./img/i33.png';
          }


          marker = new google.maps.Marker({
            position: new google.maps.LatLng(marcadores[i][0], marcadores[i][1]),
             icon:ico,
            map: map
          });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent('<div id="content" style="text-align: center;"><br><strong>'+
             marcadores[i][2]+'</strong><br><br>$ '+
             marcadores[i][3]+'<br><br>'+
             marcadores[i][4]+'<br><br><br>'+
             '<a href="verinmueble2.html?id='+marcadores[i][5]+'" style="background: #ff4000;padding: 10px;border-radius: 10px;">Ver</a><br><br><br>'
            +'</div>');
              infowindow.open(map, marker);
            }
          })(marker, i));

        }
/*  

  for (i = 0; i < marcadores.length; i++) {  
    console.log(marcadores[i][1]);
  }


  var marker = new google.maps.Marker({
    position:{lat: 8.756917, lng: -75.879524},
    map: map,
    title: 'Hello World!'
  });
*/

/*    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(pos);
      });
    }
*/


}

function carga(){
  var marcadores = [];
  var i=0;
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
                  marcadores.push([snapshot.val().lat,snapshot.val().lon,snapshot.val().direccion,snapshot.val().precio,snapshot.val().tipo_inmueble,key3]);
                  i=i+1;
                  //console.log(marcadores.length);
                  initMap(marcadores);
                });
                
            });

          });

      });
    });
  });  
  
}

function cargar(marcadores){
console.log(marcadores);
var marker, i;
      for (i = 0; i < marcadores.length; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(marcadores[i][1], marcadores[i][2]),
          map: map
        });
      }
       google.maps.event.addDomListener(window, 'load', initMap);
}

