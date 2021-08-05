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
        console.log('Error i api' + error);
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

    $("#button").on('click', function(){
        $.post("https://192.168.0.250:1000/postComment",
        {
            uid: 0, //måste hämta
            postid: id,
            msg: $('#cInput').val(),
        },
        //varför data och status måste vara på en speciell plats istället för keys är beyond me
        function(data, status){
            console.log("\nStatus: " + status);
        });
        $('#cInput').val('');
    });

    async function fetchComment() {
        const response = await fetch('https://192.168.0.250:1000/json/getComments?postid='+id);
        const data = await response.json();
        let comment = [];

        data.forEach(obj => {
            Object.entries(obj).forEach(([key, value]) => {
                comment.push(`${key} ${value}`)
            });
            printComment(comment);
            comment = [];
        });
    }

    function printComment (key) { // inte vara async då det inte finns något att vänta på
        console.log(key);
        let msg = key[1].substring(8)
        $('<li>').appendTo('#comments').attr('id', key).addClass('comment').text(msg);
    }
    fetchComment();
});