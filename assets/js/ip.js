function ip() {
    'use strict';
    let ip = "https://ipinfo.io/" + location.hash.substr(1,location.hash.length);
    $.getJSON(ip, function(data){
        if(location.hash.length>1) {
            $('#ip').html(`${data.ip}`);
        } else {
            $('#ip').html(`Your IP is ${data.ip}`);
        }
        if(data.hostname != undefined) {
            $('#hostname').html(`${data.hostname}`);
        }
        $('#org').html(`${data.org}`);
        $('#loc').html(`${data.region}, ${data.country}`);
    });
}