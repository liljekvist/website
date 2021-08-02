$(document).ready(function(){
    $("button").click(function(){
      $.post("http://192.168.0.250:1000/postComment",
      {
        uid: 0,
        postid: 1,
        msg: "This is a test comment from /tests/makeComment.js"
      },
      //varför data och status måste vara på en speciell plats istället för keys är beyond me
      function(data,status){
        console.log("\nStatus: " + status);
      });
    });
  });