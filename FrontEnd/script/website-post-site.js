$(function(){
    const id = window.location.search.substring(4);
    /**Get and show post and existing comments*/
    try {
        $.ajax({
            url: 'https://192.168.0.250:1000/json/post?postid=' + id,
            type: 'GET',
            success: function(result){
                printPost(result);
            }
        })
        
    } catch (error) {
        console.log('Error: ' + error);
        return null;
    }
    function printPost(obj) {
        const postDate = obj.date;
        const postTitle = obj.title;
        const postText = obj.msg;
        const pageDate = document.getElementById('date');
        const pageTitle = document.getElementById('pageTitle');
        const pageText = document.getElementById('pageText');
        pageDate.appendChild(document.createTextNode('Date: ' + postDate));
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
                    console.log("\nStatus: " + status);
                });
                $('#cInput').val('');
            } else {
                alert('Error; No msg')
            }
        } else {
            alert('Error; No UID, Make post to get one');
        }
    });

    async function fetchComment() {
        const response = await fetch('https://192.168.0.250:1000/json/getComments?postid='+id);
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
    }

    function printComment (key) { // inte vara async då det inte finns något att vänta på
        let msg = key[1].substring(8)
        $('<li>').appendTo('#comments').attr('id', key).addClass('comment').text(msg);
    }
    fetchComment();
});