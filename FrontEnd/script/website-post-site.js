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
        $.getJson('http://192.168.0.250:1000/json/getComments?postid=' + id, function(comment){
            $.each(comment, function(value) {
                printComment(value);
            })
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
        const commentMsg = obj.msg;
        const commentDate = obj.date;
        const commentSection = document.getElementById('commentSection');
        commentSection.appendChild(document.createTextNode('Date: ', + commentDate));
        commentSection.appendChild(document.createTextNode(commentMsg));
    }
    $('#comment').submit(function(){
        localStorage.setItem('text', 'test');
        //const uid = sessionStorage.getItem(uid);
        const comment = $('#cInput').val();
        /*
        $.ajax({
            url: 'http://192.168.0.250:1000/json/makeComment?uid=' + uid + '&message=' + comment,
            type: 'POST'
        })
        */
        return false;
    })
});