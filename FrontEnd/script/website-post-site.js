$(function(){
    const id = window.location.search.substring(4);
    try {
        $.ajax({
            url: 'http://192.168.0.250:1000/post?postid=' + id,
            type: 'GET',
            success: function(result){
                printPost(result);
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
        const pageTitle = document.getElementById('title');
        const pageText = document.getElementById('text');
        pageDate.appendChild(document.createTextNode('Date: ' + postDate));
        pageTitle.appendChild(document.createTextNode(postTitle));
        pageText.appendChild(document.createTextNode(postText));
    };
});
