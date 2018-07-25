$(function()
{


  $( "#estas" ).change(function() {
    if($( "#estas" ).val()==0){
      $( "#map" ).show();
      $( "#info" ).show();
    }else{
      $( "#map" ).hide();
      $( "#info" ).hide();
    }
  });

  $('#save_in').click(function(){

    $('#fondo_load').show();
    $('#load').show();

    if($('#dire').val()&&$('#barrio').val()&&$('#estrato').val()&&$('#mts').val()&&$('#tipo_inmueble').val()&&$('#tipo_negocio').val()&&$('#antiguedad').val()&&$('#estas').val()){
    

    
    $.confirm({
        title: 'Confirmar!',
        content: 'Estas seguro de crear este inmueble?',
        buttons: {
            si: function () {

              var user = firebase.auth().currentUser;
              //console.log(user.uid);

              return firebase.database().ref('/Clientes/' + user.uid).once('value').then(function(snapshot) {                 
                obj=snapshot.val();                  
                var o=Object.keys(obj)[0];
                console.log(o);

                var database = firebase.database();
                var referencia = database.ref('Clientes/'+user.uid+'/'+o+'/'+'inmueble');  

                if($('#estas').val()==0){
                  var lat=$('#y_lat').val();
                  var lon=$('#y_lon').val();
                }else{
                  var lat=$('#x_lat').val();
                  var lon=$('#x_lon').val();
                }
                      var add =  referencia.push({
                        direccion: $('#dire').val(),
                        barrio: $('#barrio').val(),
                        estrato: $('#estrato').val(),
                        habitaciones: $('#habitaciones').val(),
                        banos: $('#banos').val(),
                        garaje: $('#garaje').val(),
                        mts: $('#mts').val(),
                        tipo_inmueble: $('#tipo_inmueble').val(),
                        tipo_negocio: $('#tipo_negocio').val(),
                        antiguedad: $('#antiguedad').val(),
                        lat: lat,
                        lon: lon,
                      }).then(function() {
                          setTimeout(function(){ location.href ="misinmuebles.html" }, 1000);
                      });

              });
            },
            no: function () {
            }
        }
    });



    }else{
      alert("Llene los datos");
    }
 
  });

});

function geo_success(position) {
  //console.log(position.coords.latitude, position.coords.longitude);
  $('#x_lat').val(position.coords.latitude);
  $('#x_lon').val(position.coords.longitude);
}

function geo_error() {
  alert("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
};

var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

var map;
  
  function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 8.756917, lng: -75.879524},
    zoom:18 
  });
   
   var marker=new google.maps.Marker({
      position:map.getCenter(), 
      map:map, 
      draggable:true
   });
      
   google.maps.event.addListener(marker,'dragend',function(event) {
      $('#y_lat').val(this.getPosition().lat());
      $('#y_lon').val(this.getPosition().lng());
   });
}
