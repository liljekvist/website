$(document).ready(function(){
    $("button").click(function(){
      $.post("https://192.168.0.250:1000/registerUser",
      { },
      //varför data och status måste vara på en speciell plats istället för keys är beyond me
      function(data,status){
        console.log("\nStatus: " + status);
      });
    });
  });