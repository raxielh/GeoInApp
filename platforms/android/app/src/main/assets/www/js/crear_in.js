$(function()
{

  $('#save_in').click(function(){
    $.confirm({
        title: 'Confirmar!',
        content: 'Estas seguro de crear este inmueble?',
        buttons: {
            si: function () {
              $.confirm({
                  title: 'Confirmar!',
                  content: 'Quieres agregar fotos ahora?',
                  buttons: {
                      "Esta bien": function () {
                      },
                      "En otro momento": function () {
                      }
                  }
              });
            },
            no: function () {
            }
        }
    });
 
  });

});
