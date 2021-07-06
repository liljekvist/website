$(function(){
    const id = window.location.search.substring(4);
    console.log(id);
    $.get("http://192.168.0.250:1000/post", {postid: id});

    function showPost(title, msg){
        
    }
});