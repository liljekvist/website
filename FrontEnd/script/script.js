$(function() {
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
    $.getJSON('http://192.168.0.250:1000/json/getPosts', function(data){
        $.each(data, function (name, value) {
            showPost(value);
        });
    });

    function showPost(obj) {
        let postId = obj.postId;
        let title = obj.title;
        $('<li>').val('<a href="post/',postId,'">', title, '</a>').appendTo('#postList').attr('id', postId).addClass('post');
    }
    //Måste fixa så att Titlen går att klicka och tar en till deb sidan. Detta som är nu kommer inte att fungera


    $('.post').on('click', function(e){
        console.log("hje")
        postId = e.target.id;
        console.log(postId);
    });
})