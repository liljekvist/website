$(function() {

    //Check so that the cookie exists
    function checkCookie() {
        let uuid = getCookie();
        if(uuid != null) { //Jättefult men måste göra npgot i denna stil för att dom inte ska synas
            getUID(uuid); //om man är inloggad
            $('#showUuid, #logoutBtn, #creatBtn').show();
            $('#loginText, #signText').hide()
            $('#loginText, #signText').removeClass('iconText');
            return

        }
        $('#loginBtn, #signBtn').show();
        $('#key, #logoutText').hide();
        $('#key, #logoutText').removeClass('iconText');
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
        if (sessionStorage.getItem('uid') == null) {
            await fetch(`https://192.168.0.250:1000/json/getUid?uuid=${uuid}`)
                .then(response => response.json())
                .then(data => useUid(data))
                .catch((err) => {
                console.log('Error:'+ err);
            });
        } else {$('#userId').text(sessionStorage.getItem('uid'))}
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
    if (window.location.pathname == '/') {
        $.getJSON('https://192.168.0.250:1000/json/getPosts', function(data){
        $.each(data, function (name, value) {
            showPost(value);
        });
        ownerPost();
    });

    }

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
        document.cookie = 'uuid=' + (uuid || '') + `${expires}; path=/`;
        checkCookie();
    }
    function login(data, input) {
        if (data.uuidExists) {
            setCookie(input);
        } else {
            alert('Error; this UUID does not exist')
        }
    }

    $('#loginBtn, #loginText').on('click', function() {
        const input = window.prompt("UUID");
        if ((input == null)||(input == '')) {
            alert('Faild');
            return
        }
        loginCheck(input);
    })

    async function loginCheck(input) {
        await fetch(`https://192.168.0.250:1000/json/uuidInDb?uuid=${input}`)
        .then(response => response.json())
        .then(data => login(data, input))
        .catch((err) => {
            console.log('Error:' + err);
        });
        location.reload();
    }

    $('#showUuid, #key').on('click', function () {
        alert(`Your private login key: ${getCookie()}`)
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

    $('#logoutBtn, #logoutText').on('click', function() {
        document.cookie = 'uuid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
        sessionStorage.clear();
        location.reload();
    });

    $('#creatBtn, #creatText').on('click', function(){
        document.location.href='https://192.168.0.250/submit';
    })

    //Post/comment site
    /**Get and show post and existing comments*/
    if (window.location.pathname.substr(0, 6) == '/post/') {
        const id = window.location.search.substring(4);
        try {
            $.ajax({
                url: `https://192.168.0.250:1000/json/post?postid=${id}`,
                type: 'GET',
                success: function(result){
                    printPost(result);
                }
            })
            
        } catch (error) {
            console.log('Error: ' + error);
            return null;
        }
    }
    
    function printPost(obj) {
        const posterId = obj.uid;
        const postDate = obj.date;
        const postTitle = obj.title;
        const postText = obj.msg;
        const pagePosterId = document.getElementById('posterId');
        const pageDate = document.getElementById('date');
        const pageTitle = document.getElementById('pageTitle');
        const pageText = document.getElementById('pageText');
        pagePosterId.appendChild(document.createTextNode(`Post made by user: ${posterId}`))
        pageDate.appendChild(document.createTextNode(`Posted: ${postDate}`));
        pageTitle.appendChild(document.createTextNode(postTitle));
        pageText.appendChild(document.createTextNode(postText));
    };

    $('#button').on('click', function(){
        const id = window.location.search.substring(4)
        const msg = $('#cInput').val();
        const uid = sessionStorage.getItem('uid');
        if (uid != null) {
            if (msg != '') {
                $.post('https://192.168.0.250:1000/postComment',
                {
                    uid: sessionStorage.getItem('uid'),
                    postid: id,
                    msg: $('#cInput').val(),
                },
                function(data, status){
                    console.log('\nStatus: ' + status);
                });
                $('#cInput').val('');
            } else {
                alert('Error: No msg')
            }
        } else {
            alert('Error: No UID, Make post to get one');
        }
    });

    async function fetchComment() {
        const id = window.location.search.substring(4);
        console.log("hej");
        const response = await fetch(`https://192.168.0.250:1000/json/getComments?postid=${id}`);
        const data = await response.json();
        let comment = [];
        try {
            data.forEach(obj => {
                Object.entries(obj).forEach(([key, value]) => {
                    comment.push(`${key} ${value}`)
                });
                printComment(comment);
                comment = [];
            });
        } catch {
            $('<li>').appendTo('#comments').attr('id', 'placeholder').addClass('comment').text('No comments yet');
        }
        ownerPost();
    }

    function printComment (key) { // inte vara async då det inte finns något att vänta på
        let uid = key[2].substring(4)
        let msg = key[1].substring(8)
        $('<li>').appendTo('#comments').attr('id', uid).addClass(`comment ${uid}`).text(msg);
    }

    if (window.location.pathname.substr(0,6) == '/post/') {
        fetchComment();
        
    }
    checkCookie();
});