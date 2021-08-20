$(function(){
    const id = window.location.search.substring(4);
    /**Get and show post and existing comments*/
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
    
    function getCookie(){
        const allCookies = document.cookie.split(';');
        for (let i = 0; i < allCookies.length; i++) {
            let cookie = allCookies[i].trim();
            if (cookie.substr(0, 4) == 'uuid') {
                return cookie;
            }
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
        pageDate.appendChild(document.createTextNode(`Post date: ${postDate}`));
        pageTitle.appendChild(document.createTextNode(postTitle));
        pageText.appendChild(document.createTextNode(postText));
    };

    $('#button').on('click', function(){
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
            url: `https://192.168.0.250:1000/delete/deletePost?postid=${idOfItemDeleted}&${getCookie()}`,
            success: function (response) {
                console.log(response);
            }
        });   
    }

    fetchComment();
});