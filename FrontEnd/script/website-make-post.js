$(function(){
    //Useless button
    const button = document.getElementById("#button");
    
    function getTitle() {
        const query = window.location.search;
        return query.split('=')[1];
    }
    $('#title').val(getTitle());
})