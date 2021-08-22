$(function() {

    //Check so that the cookie exists
    function checkCookie() {
        let uuid = getCookie();
        if(uuid != null) {
            getUID(uuid);
            $('.signBtn').hide();
            $('#loginBtn').hide();
        } else {
            $('.signBtn').show();
            $('#loginBtn').show();
            //vad den ska göra ifall det inte finns cookie 
        }
    }

    //Looks for the cookie with the right "Name"
    function getCookie(){
        const allCookies = document.cookie.split(';');
        for (let i = 0; i < allCookies.length; i++) {
            let cookie = allCookies[i].trim();
            if (cookie.substr(0, 4) == 'uuid') {
                cookie = cookie.substr(5);
                return cookie;
            }
        }
    }
    //Fetch the UID from the UUID via a get req to the API
    async function getUID(uuid){
        await fetch(`https://192.168.0.250:1000/json/getUid?uuid=${uuid}`)
        .then(response => response.json())
        .then(data => useUid(data))
        .catch((err) => {
            console.log('Error:'+ err);
        });
    }
    //Sets UID to the session storage and makes the UID visible to the user
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
        ownerPost();
    });

            //Adds the posts to a list
    function showPost(obj) {
        const postId = obj.postid;
        const postUID = obj.uid;
        const title = obj.title;
        $('<li>').appendTo('#postList').attr('id', postId).addClass('post ' + postUID);
        makePostLink(postId, title);
    }
            //Makes the posts a link so you can accses the post
    function makePostLink(postId, title){
        let post = document.createElement('a');
        let linkText = document.createTextNode(title);
        post.appendChild(linkText);
        post.title = postId;
        post.href = `https://192.168.0.250/post?id=${postId}`;
        document.getElementById(postId).appendChild(post);
    }

    function setCookie(uuid){
        const date = new Date();
        date.setFullYear(2022, 0, 1); //Borde inte vara statisk men men
        expires = '; expires=' + date.toUTCString();
        document.cookie = 'uuid=' + (uuid || '') `${expires}; path=/`;
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
        await fetch(`https://192.168.0.250:1000/json/uuidInDb?uuid=${input}`)
        .then(response => response.json())
        .then(data => login(data, input))
        .catch((err) => {
            console.log('Error:' + err);
        });
    }

    $('#showUuid').on('click', function () {
        alert(`Your private login key: ${getCookie().substr(6)}`)
    })

    function ownerPost() {
        const user = sessionStorage.getItem('uid');
        let userPost = document.getElementsByClassName(user);
        for (let i = 0; i < userPost.length; i++) {
            let post = userPost[i];
            $(post).addClass('owner');
            makeRemoveButton($(post).attr('id'));
        }
    }
    function makeRemoveButton(id) {
        $('<span>').appendTo(`#${id}`).addClass('remove').text('X');
    };
    $(document).on('click', '.remove', function() {
        const parentId = $(this).parent().attr('id');
        deletePost(parentId);
        $(`#${parentId}`).remove();
    });
    
    //Kanske borde bli async men pallar inte nu
    async function deletePost(idOfItemDeleted) {
        $.ajax({
            type: 'DELETE',
            url: `https://192.168.0.250:1000/delete/deletePost?postid=${idOfItemDeleted}&uuid=${getCookie()}`,
            success: function (response) {
                console.log(response);
            }
        });   
    }

    $('#navIcon').on('click', function() {
        $(this).toggleClass('open');
        if (!$('#navIcon').hasClass('open')) {
            $('#sideSlide').animate({
                width: '5rem'
            },'fast')
            $('.iconText').hide();
            return
        }
        $('#sideSlide').animate({
            width: 300
        },'fast')
        setTimeout(function(){
            $('.iconText').show();
        }, 155);
    })

    checkCookie();
});