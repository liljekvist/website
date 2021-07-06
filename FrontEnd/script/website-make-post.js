$(function(){
    function getTitle() {
        const query = window.location.search;
        return query.split('=')[1];
    }
    //Tar titlen man skriv in tidigare och sen

    $.ajax({
        url: '192.168.0.250:1000/post',
        type: 'POST',
        data: data,
        success: function(result){
            console.log(result);
        }
    })
})