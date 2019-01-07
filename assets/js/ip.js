var ipData;

function ip() {
    'use strict';
    let ip = "https://ipinfo.io/" + location.hash.substr(1,location.hash.length);
    $.getJSON(ip, function(data){
        var city = "", region = "";
        if(location.hash.length>1) {
            $('#ip').html(`${data.ip}`);
        } else {
            $('#ip').html(`${data.ip}`);
        }
        if(data.hostname != undefined) {
            $('#hostname').html(`${data.hostname}`);
        }

        if(data.city != "") {
            city = `${data.city}, `;
        }

        if(data.region != "") {
            region = `${data.region}, `;
        }

        $('#org').html(`${data.org}`);
        $('#loc').html(`${city} ${region} ${data.country}`);
        ipData = data;
    });
}
