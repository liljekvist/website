$(function() {
    function checkCookie() {
        let uuid = getCookie();
        if(uuid != null) {
            uuid = uuid.substr(5);
            $('#uuid').text(uuid);
            getUID(uuid);
            $('.signBtn').hide();
        } else {
            $('.signBtn').show();
            //vad den ska göra ifall det inte finns cookie 
        }
    }


    function getCookie(){
        const allCookies = document.cookie.split(';');
        for (let i = 0; i < allCookies.length; i++) {
            let cookie = allCookies[i].trim();
            if (cookie.substr(0, 4) == 'uuid') {
                return cookie;
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

    function setCookie(uuid){
        const date = new Date();
        date.setFullYear(2022, 0, 1); //Borde inte vara statisk men men
        expires = '; expires=' + date.toUTCString();
        document.cookie = 'uuid' + '=' + (uuid || '') + expires + '; path=/';
        checkCookie();
    }
    function login(data, input) {
        if (data.uuidExists) {
            setCookie(input);
        } else {
            alert('Error; this UUID does not exist')
        }
    }

    $('#loginBtn').on('click', function() {
        const input = window.prompt("UUID");
        if ((input == null)||(input == '')) {
            alert('Faild');
        } else {
            loginCheck(input);
        }
    })

    async function loginCheck(input) {
        await fetch('https://192.168.0.250:1000/json/uuidInDb?uuid=' + input)
        .then(response => response.json())
        .then(data => login(data, input));
    }
    checkCookie();
});