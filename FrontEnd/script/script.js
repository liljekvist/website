$(function() {
    //First Time Page StartUp
    /* Set coockies USE LATER
    function setCookie(uid, uuid, date){
        let expires = "";
        if (date) {
            const date = new Date();
            date.setTime(date.getTime() + (date*24*60*60*1000))
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = uid + "=" + (uuid || "") + expires + "; path=/"
    }
    setCookie();
    */

    //Get UUID array
    //From the URL
    //Index is the UID and UUID
    $.getJSON("http://192.168.0.250:1000/json", function(data){
        $.each(data, function (index, value) {
            console.log(value);
        });
    });
})