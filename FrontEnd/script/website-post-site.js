$(function(){
    const id = window.location.search.substring(4);
    /**Get and show post and existing comments*/
    try {
        $.ajax({
            url: 'http://192.168.0.250:1000/post?postid=' + id,
            type: 'GET',
            success: function(result){
                printPost(result);
            }
        })
        $.ajax({
            url: 'http://192.168.0.250:1000/json/getComments?postid=' + id,
            type: 'GET',
            success: function(result){
                printComment(result);
                //Kommer inte att fungera
            }
        })
    } catch (error) {
        console.log('Micke är stinky och detta är felet: ' + error);
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

    function printComment(obj) {
        //komer inte att fungera. Allt kommern nog att hamna i samma "comment"
        const commentMsg = obj.msg;
        const commentDate = obj.date;
        $('<li>').appendTo('#comments').addClass('comment', 'active'); //Väldigt fult måste ändras. Kanske $(this) kan fungera men tror inte det
        $('active').appendChild(document.createTextNode('Date: ', + commentDate));
        $('active').appendChild(document.createTextNode(commentMsg));
        $('active').removeClass('active');
    }

    $('#button').on('click', function(){
        alert("hej")
        //const uid = sessionStorage.getItem(uid);
        const comment = $('#cInput').val();
        localStorage.setItem('test', comment);
        /*
        $.ajax({
            url: 'http://192.168.0.250:1000/json/makeComment?uid=' + uid + '&message=' + comment,
            type: 'POST'
        })
        */
        $('#cInput').val('');
        return false;
    })
});