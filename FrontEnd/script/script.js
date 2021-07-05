$(function() {
    $.ajax({'url': "http://192.168.0.250:1000/json" ,dataType:'json',crossDomain:true,success:function(response){      
        console.log(response.data); 
      }
   });
})