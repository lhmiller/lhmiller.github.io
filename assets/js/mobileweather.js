var locTag = "Geolocation", color = "bg-success", roundedLocationData;
var wxdata;
var hourlyshown = true;
toggleHourly();

function showWeather() {
    'use strict';
    location.hash = encodeURIComponent("geolocation");
    weatherLoad();
}

function hideWeather() {
    'use strict';
    location.hash = "noweather";
    $('#weather').hide();
    $('#wxShowButton').show();
}

function updateLM() {
    'use strict';
    var LMraw = document.lastModified,
        year = LMraw.substr(6, 4),
        month = LMraw.substr(0, 2),
        day = LMraw.substr(3, 2),
        hour = parseInt(LMraw.substr(11, 2), 10),
        hr = ((hour > 12) ? hour - 12 : (hour > 0 ? hour : 12)),
        mn = LMraw.substr(14, 2),
        ampm = (hour >= 12) ? " PM" : " AM",
        lm = "<strong>Page updated " + year + "-" + month + "-" + day + " at " + hr + ":" + mn + ampm + "</strong>";
    
    document.getElementById("version").innerHTML = lm;
}

function weather(loc) {
    'use strict';
    $('#weather').show();
    var wxLoc;
    if (loc !== undefined) {
        wxLoc = loc;
    } else {
        wxLoc = "autoip";
    }
    location.hash = encodeURIComponent(wxLoc);

    jQuery.ajax({
        url: `https://api.wunderground.com/api/2fc23ac9e477ca80/conditions/astronomy/forecast10day/hourly/q/${wxLoc}.json`,
        // url: `/weather.json`,
        type: 'GET',
        success: function(resultData) {
            showWeatherData(resultData);
        }
    });
}

function showWeatherData(data) {
    'use strict';
    wxdata = data;
    var cu = data.current_observation,
        fc = data.forecast.simpleforecast.forecastday,
        ho = data.hourly_forecast,
        wxupdated = new Date(cu.observation_time_rfc822),
        wxmo = addZero(wxupdated.getMonth() + 1),
        wxdy = addZero(wxupdated.getDate()),
        wxhr = wxupdated.getHours(),
        wxmn = addZero(wxupdated.getMinutes()),
        tmrw = fc[1].high.fahrenheit - fc[0].high.fahrenheit,
        tmrwtxt = data.forecast.txt_forecast.forecastday[0].fcttext,
        tmrwtxtday = data.forecast.txt_forecast.forecastday[0].title,
        cond = fc[1].conditions.toLowerCase(),
        wind,
        dgrs = "degree" + plural(tmrw),
        stdy,
        fr,
        wp,
        wt,
        hl,
        qpf;
    
    if (cu.wind_mph <= 0 && cu.wind_gust_mph <= 0) {
        wind = "none";
    } else if (cu.wind_mph === 0) {
        wind = cu.wind_gust_mph * 1 + " MPH";
    } else if (cu.wind_gust_mph === 0) {
        wind = cu.wind_mph * 1 + " MPH";
    } else {
        wind = `${cu.wind_mph * 1}&nbsp;-&nbsp;${cu.wind_gust_mph * 1} MPH`;
    } 
    
    if (wind === "none") {
        wind = "";
    } else if (cu.wind_mph === cu.wind_gust_mph) {
        wind = cu.wind_mph + " MPH";
    }

    if (wind === "") {
        wt = `<tr class="wxfct bg-primary">
        <td colspan="2"><p class="h4s">${cu.relative_humidity}</p></td>
        </tr>`;
    } else {
        wt = `<tr class="wxfct bg-primary">
        <td><p class="h4s">${wind}</p></td>
        <td><p class="h4s">${cu.relative_humidity}</p></td>
        </tr>`
    }
    
    if (tmrw < 0) {
        tmrw *= -1;
        tmrw = `<div class="bg-info tmrw-cool"><h4>${tmrwtxtday}: ${tmrwtxt}<h4></div>`;
    } else if (tmrw === 0) {
        tmrw = `<div class="tmrw-same"><h4>${tmrwtxtday}: ${tmrwtxt}</h4></div>`;
    } else {
        tmrw = `<div class="bg-warning tmrw-warm"><h4>${tmrwtxtday}: ${tmrwtxt}</h4></div>`;
    }
    
    if (wxupdated.getHours() > 22) {
        stdy = 1;
    } else {
        stdy = 0;
    }
    
    let almanac = `<div class="bg-warning almanac"><h4>Sunrise:&nbsp;${data.sun_phase.sunrise.hour}:${data.sun_phase.sunrise.minute}&nbsp;${ampm(data.sun_phase.sunrise.hour)}<br>Sunset:&nbsp;${twelveHour(data.sun_phase.sunset.hour)}:${data.sun_phase.sunset.minute}&nbsp;${ampm(data.sun_phase.sunset.hour)}</h4></div>`;
    
    let controls = `<div class="text-center">
    <div class="btn-group">
        <!--<button type="button" class="btn btn-success btn-xs" id="geobtn" onclick="getLocation();setLocTag('Geolocation');">Use Geolocation</button>-->
        <button type="button" class="btn btn-warning btn-xs" onclick="wxEntry();">Change Location</button>
        <div class="btn-group dropdown">
            <button type="button" class="btn btn-warning btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a onclick='getLocation();setLocTag("Geolocation");' class="awnhref">Use Geolocation</a></li>
                <li><a onclick='weather("PWS:KCAATASC45");setLocTag("home");' class="awnhref">Home</a></li>
                <li><a onclick='weather(93422);setLocTag("atas");' class="awnhref">Atascadero</a></li>
                <li><a onclick='weather(93401);setLocTag("slo");' class="awnhref">SLO</a></li>
                <li><a onclick='weather("PWS:KCASANLU39");setLocTag("cp");' class="awnhref">Cal Poly</a></li>
                <li><a onclick='weather("35.294078,-120.670933");setLocTag("fh");' class="awnhref">FH</a></li>
                <li><a onclick='weather("37.225830,-119.156667");setLocTag("cpeak");' class="awnhref">China Peak</a></li>
            </ul>
        </div>
    </div>
</div>`

    let tenday = "<table class='table noselect tenday'><tr>";
    for (let i = stdy; i < fc.length; i++) {
        qpf = fc[i].qpf_allday.in == 0 ? `` : `&nbsp;&#40;${fc[i].qpf_allday.in}&#34;&#41;`;
        tenday += `<tr class="wxfct bg-primary"><td class="rounded-left">${fc[i].date.weekday_short}<br>`;
        tenday += `${fc[i].date.month}/${fc[i].date.day}</td>`;
        tenday += `<td><img class='wxico' src='https://icons.wxug.com/i/c/v4/${fc[i].icon}.svg'></td>`;
        tenday += `<td>High: ${fc[i].high.fahrenheit} &deg;F<br>`;
        tenday += `Low: ${fc[i].low.fahrenheit} &deg;F</td>`;
        tenday += `<td class="rounded-right tablevertcenter">${fc[i].avewind.mph} MPH `;
        tenday += fc[i].pop == 0 ? `${fc[i].avewind.dir}` : `${fc[i].avewind.dir}<br>${fc[i].pop}&#37;${qpf}</td>`;
        tenday += `</tr>`;
    }
    tenday += "</tr></table>";

    let hourly = "<table class='table noselect tenday hourly'>";
    for (let i = 0; i < ho.length; i++) {
        if(ho[i].FCTTIME.hour == "0") {
            hourly += `<tr></tr>`
        }
        fr = ho[i].temp.english == ho[i].feelslike.english ? `<td><h4>${ho[i].temp.english} &deg;F</h4></td>` : `<td>${ho[i].temp.english} &deg;F<br>Feels like ${ho[i].feelslike.english} &deg;F</td>`;
        qpf = ho[i].qpf.english == 0 ? `` : `&nbsp;&#40;${ho[i].qpf.english}&#34;&#41;` ;
        wp = ho[i].pop == 0 ? `<td class="rounded-right tablevertcenter">${ho[i].wspd.english} MPH ${ho[i].wdir.dir}</td>` : `<td class="rounded-right tablevertcenter">${ho[i].wspd.english} MPH ${ho[i].wdir.dir}<br>${ho[i].pop}&#37;${qpf}</td>`;
        hourly += `<tr class="wxfct bg-primary"><td class="rounded-left">`;
        hourly += `<strong>${ho[i].FCTTIME.civil}</strong><br>${ho[i].FCTTIME.weekday_name_abbrev} ${ho[i].FCTTIME.mon_abbrev} ${ho[i].FCTTIME.mday}</td>`;
        hourly += `<td><img class='wxico' src='https://icons.wxug.com/i/c/v4/${ho[i].icon}.svg'></td>`;
        hourly += fr;
        hourly += wp;
        hourly += `</tr>`;
    }
    hourly += "</table>";

    hl = `<tr class="wxfct bg-primary">
    <td class="br-bottomleft"><p class="h4s">High: ${fc[0].high.fahrenheit} &deg;F</p></td>
    <td class="br-bottomright"><p class="h4s">Low: ${fc[0].low.fahrenheit} &deg;F</p></td>
    </tr>`;

    wxupdated = `${wxupdated.getFullYear()}-${wxmo}-${wxdy}&nbsp;at&nbsp;${twelveHour(wxhr)}:${wxmn}&nbsp;${ampm(wxhr)}`;
    $('#weather-version').html(`<strong>Weather data updated ${wxupdated}</strong>`);
    $('#weather').html(`
    <div class="location"><p>${cu.display_location.city}</p></div>
    <span id="loctag" class="${color} noselect">${locTag}</span>
    <div id="controls">${controls}</div>
    <table class='table noselect cctable'>
    <tr class="wxfct bg-primary">
    <td class="br-topleft"><p class="h3s">${cu.weather}</p></td>
    <td class="br-topright"><p class="h3s">${cu.temp_f}&deg;F</p></td>
    </tr>
    ${wt}
    ${hl}
    </table>
    ${tmrw}
    <h3>10 Day Forecast</h3>
    <div>${tenday}</div>
    <div><button type="button" class="btn btn-danger btn-xs" onclick="toggleHourly();">Toggle Hourly</button></div>
    <h3 class='hourly'>Hourly Forecast</h3>
    <div>${hourly}</div>
    ${almanac}
                        `);
    toggleHourly();
}

function update() {
    'use strict';
    updateLM();
}

function addZero(input) {
    'use strict';
    if (input < 10) {
        return "0" + input;
    } else {
        return input;
    }
}

function twelveHour(input) {
    'use strict';
    if (input === 0) {
        return 12;
    } else if (input > 12) {
        return input - 12;
    } else {
        return input;
    }
}

function ampm(input) {
    'use strict';
    if (input < 12) {
        return "AM";
    } else {
        return "PM";
    }
}

function plural(input) {
    'use strict';
    if (input === 1 || input === -1) {
        return "";
    } else {
        return "s";
    }
}

function wxEntry() {
    'use strict';
    var input = prompt("Please enter a zip code, city/state, or latitude & longitude.", "");
    weather(input);
    setLocTag(input);
}

function getLocation() {
    'use strict';
    $('#geobtn').html("Loading...");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (pos) {
                var locationData = `${pos.coords.latitude},${pos.coords.longitude}`;
                weather(locationData);
                setLocTag("Geolocation");
                location.hash = encodeURIComponent("geolocation");
                roundedLocationData = `${Math.round(pos.coords.latitude*10000)/10000}, ${Math.round(pos.coords.longitude*10000)/10000}`;
            },
            function (err) {
                console.log(err);
                weather();
            }, { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 });
    } else {
        weather();
    }
}

function weatherLoad() {
    'use strict';
    $('#wxShowButton').hide();
    if (document.location.hash.length > 0) {
        if (document.location.hash.substr(1,document.location.hash.length) === "geolocation") {
            getLocation();
        } else if (document.location.hash.substr(1,document.location.hash.length) === "noweather") {
            $('#weather').hide();
            $('#wxShowButton').show();
        } else {
            weather(decodeURIComponent(document.location.hash.substr(1,document.location.hash.length)));
            setLocTag(decodeURIComponent(document.location.hash.substr(1,document.location.hash.length)));
        }
    } else {
        getLocation();
    }
}

function setLocTag(loc) {
    'use strict';
    switch (loc) {
    case "home":
        locTag = "Home";
        color = "bg-danger";
        break;
    case "atas":
        locTag = "Atascadero";
        color = "bg-danger";
        break;
    case "slo":
        locTag = "SLO";
        color = "bg-danger";
        break;
    case "cp":
        locTag = "Cal Poly";
        color = "bg-danger";
        break;
    case "fh":
        locTag = "FH";
        color = "bg-danger";
        break;
    case "cpeak":
        locTag = "China Peak";
        color = "bg-danger";
        break;
    case "Geolocation":
        locTag = "Geolocation";
        color = "bg-success";
        break;
    default:
        locTag = loc;
        color = "bg-danger";
    }
}

function toggleHourly() {
    'use strict';
    if (hourlyshown) {
        $('.hourly').hide();
        hourlyshown = false;
    } else {
        $('.hourly').show();
        hourlyshown = true;
    }
}