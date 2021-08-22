$(document).ready(function(){
    $("button").click(function(){
      $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "PUT",
        url: "https://192.168.0.250:1000/registerUser"
      }).done(function (data) {
          console.log(data);
      });
    });
  });