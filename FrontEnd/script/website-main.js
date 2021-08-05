$(function() {
    function checkCookie() {
        var uuid = getCookie();
        console.log(uuid);
    
        if(uuid != null) {
            console.log(uuid);
            sendUUID(uuid);
        } else {
            //vad den ska göra ifall det inte finns cookie 
        }
    }

    function getCookie(){
        const allCookies = document.cookie.split(';');
        console.log(allCookies);
    }

    async function sendUUID(uuid){
        const response = await fetch('/json/getUid?uuid=' + uuid);
        console.log(response);
    }
    sessionStorage.setItem("test", "testar");
    //First Time Page StartUp
    /* Set coockies USE LATER
    function setCookie(uid, uuid, date){
        let expires = '';
        if (date) {
            const date = new Date();
            date.setTime(date.getTime() + (date*24*60*60*1000))
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = uid + '=' + (uuid || '') + expires + '; path=/'
    }
    setCookie();

    */

            //Get UUID array
            //From the URL
            //Value is the UID and UUID
            //Name is user
            //Get post from API
    $.getJSON('https://192.168.0.250:1000/json/getPosts', function(data){
        $.each(data, function (name, value) {
            showPost(value);
        });
    });

            //Adds the posts to a list
    function showPost(obj) {
        let postId = obj.postid;
        let title = obj.title;
        $('<li>').appendTo('#postList').attr('id', postId).addClass('post');
        makePostLink(postId, title);
    }
            //Makes the posts a link so you can accses the post
    function makePostLink(postId, title){
        let post = document.createElement('a');
        let linkText = document.createTextNode(title);
        post.appendChild(linkText);
        post.title = postId;
        post.href = "https://192.168.0.250/post?id="+postId;
        document.getElementById(postId).appendChild(post);
    }
    checkCookie();
});