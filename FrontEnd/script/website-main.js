$(function() {
    function checkCookie() {
        let uuid = getCookie();
        if(uuid != null) {
            uuid = uuid.substr(5);
            $('#uuid').text(uuid);
            getUID(uuid);
        } else {
            //vad den ska göra ifall det inte finns cookie 
        }
    }

    function getCookie(){
        const allCookies = document.cookie.split(';');
        for (let i = 0; i < allCookies.length; i++) {
            if (allCookies[i].substr(0, 4) == 'uuid') {
                return allCookies[i];
            }
        }
    }

    async function getUID(uuid){
        await fetch('https://192.168.0.250:1000/json/getUid?uuid=' + uuid)
        .then(response => response.json())
        .then(data => useUid(data));
    }

    function useUid(uid) {
        uid = uid.uid;
        sessionStorage.setItem('uid', uid);
        $('#userId').text(uid);
    }

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