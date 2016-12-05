var locTag = "Geolocation", color = "bg-success", roundedLocationData;

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

function startTime() {
    'use strict';
    var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        now = new Date(),
        dtString = dayName[now.getDay()] + ", " + monName[now.getMonth()] + " " + now.getDate() + " (Week 10)";
    document.getElementById('txt2').innerHTML = dtString;
}

function showTime() {
    'use strict';
    var now = new Date(),
        hours = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds(),
        millis = now.getMilliseconds(),
        timeValue = String((hours > 12) ? hours - 12 : (hours > 0 ? hours : 12)),
        run = setTimeout(function () {
            showTime();
        }, 1000 - millis < 10 ? 1000 : 1000 - millis
            );
    timeValue += ((minutes < 10) ? " 0" : " ") + minutes;
    timeValue += ((seconds < 10) ? " 0" : " ") + seconds;
    timeValue += (hours >= 12) ? " PM" : " AM";
    document.getElementById("newClock").innerHTML = timeValue;
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

function updateLinks() {
    'use strict';
    var links = [
        [
            ["danger", "https://www.google.com", "Google"],
            ["danger", "https://www.gmail.com/", "Gmail"],
            ["danger", "https://drive.google.com/", "Drive"],
            ["danger", "https://calendar.google.com/", "Calendar"],
            ["default", "https://my.cuesta.edu/", "My Cuesta"],
            ["info", "https://docs.google.com/spreadsheets/d/1e6uSnEvF8KesepUI2IMivxA_RQcrPU1OOI0PFVKqor4/", "Grades"],
            ["info", "https://docs.google.com/spreadsheets/d/1eEiRDzKS6eCE8oAOYBbb9aAxYFubfTTpxwkrl6k9BuI/", "Degree Progress"],
            ["info", "https://docs.google.com/spreadsheets/d/1fzjQ8DVAv8ZOfjONMBP3YoFqLj6CyxZQCmVkf-kS9F0/", "MINDBODY Hours"]
        ],
        [
            ["success", "https://my.calpoly.edu", "My Cal Poly"],
            ["success", "https://my.calpoly.edu/cas/login?service=https://cmsweb.calpoly.edu/psp/HSLOPRD/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_SSS_STUDENT_CENTER%26IsFolder=false%26IgnoreParamTempl=FolderPath%2cIsFolder%26RL=%26target=main0%26navc=2398?cmd=login%26languageCd=ENG%26userid=PS%26pwd=z", "Student Center"],
            ["success", "https://pass.calpoly.edu/login.do", "PASS"],
            ["success", "https://polyplanner.calpoly.edu/", "PolyPlanner"],
            ["success", "https://dashboards.calpoly.edu/dw/polydata/student_poly_profile_self_svc.display", "PolyProfile"],
            ["success", "http://schedules.calpoly.edu/", "Schedules"],
            ["success", "https://my.calpoly.edu/cas/login?service=https://studentpay.calpoly.edu/CASServlet?type=student", "Resnet Timesheet"],
            ["success", "http://catalog.calpoly.edu/", "Catalog"],
            ["success", "http://www.polyratings.com/", "Polyratings"]
        ],
        [
            ["warning", "https://internal.housing.calpoly.edu/", "UH Internal"],
            ["warning", "https://backupclearpass.netadm.calpoly.edu/tips/tipsLogin.action", "ClearPass"],
            // ["warning", "https://resnetcontroller2.netadm.calpoly.edu:4343/", "PCV Controller"],
            ["warning", "https://prtg.lucashmiller.com/", "PRTG"],
            ["warning", "https://unifi.lucashmiller.com/", "UniFi Controller"],
            ["warning", "http://edge.lucashmiller.com:8080/", "eGauge"],
            ["warning", "http://edge.lucashmiller.com/", "EdgeRouter"],
            // ["warning", "https://splunk.lucashmiller.com/", "Splunk"],
            // ["warning", "https://www.cloudflare.com/login", "CloudFlare"],
            ["warning", "https://cibng.ibanking-services.com/EamWeb/Account/Login.aspx?orgId=385_122238420&FIFID=122238420&brand=385_122238420&appId=CeB&FIORG=385", "Rabobank"],
            ["warning", "https://onlinebanking.usbank.com/Auth/Login", "USBank"],
            ["warning", "https://servicing.capitalone.com/c1/Login.aspx", "CapitalOne"]
        ]
    ],
        goog = "";
    for (var link in links[0]) {
        goog += `<a class="btn btn-${links[0][link][0]}" role="button" href="${links[0][link][1]}">${links[0][link][2]}</a>`;
    }
    
    document.getElementById("goog").innerHTML = goog;
    
    var poly = "";
    for (var link in links[1]) {
        poly += `<a class="btn btn-${links[1][link][0]}" role="button" href="${links[1][link][1]}">${links[1][link][2]}</a>`;
    }
    document.getElementById("poly").innerHTML= poly;
    
    var it = "";
    for (var link in links[2]) {
        it += `<a class="btn btn-${links[2][link][0]}" role="button" href="${links[2][link][1]}">${links[2][link][2]}</a>`;
    }
    document.getElementById("it").innerHTML = it;
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
        url: `https://api.wunderground.com/api/2fc23ac9e477ca80/conditions/astronomy/forecast10day/q/${wxLoc}.json`,
        type: 'GET',
        success: function(resultData) {
            showWeatherData(resultData);
        }
    });
}

function showWeatherData(data) {
    'use strict';
    var cu = data.current_observation,
        fc = data.forecast.simpleforecast.forecastday,
        wxupdated = new Date(cu.observation_time_rfc822),
        wxmo = addZero(wxupdated.getMonth() + 1),
        wxdy = addZero(wxupdated.getDate()),
        wxhr = wxupdated.getHours(),
        wxmn = addZero(wxupdated.getMinutes()),
        tmrw = fc[1].high.fahrenheit - fc[0].high.fahrenheit,
        cond = fc[1].conditions.toLowerCase(),
        wind,
        dgrs = "degree" + plural(tmrw),
        stdy;
    
    if (cu.wind_mph === 0 && cu.wind_gust_mph === 0) {
        wind = 0;
    } else if (cu.wind_mph === 0) {
        wind = cu.wind_gust_mph * 1;
    } else if (cu.wind_gust_mph === 0) {
        wind = cu.wind_mph * 1;
    } else {
        wind = `${cu.wind_mph * 1}&nbsp;-&nbsp;${cu.wind_gust_mph * 1}`;
    }
    
    if (cu.wind_mph === cu.wind_gust_mph) {
        wind = cu.wind_mph;
    }
    
    if (tmrw < 0) {
        tmrw *= -1;
        tmrw = `<div class="bg-info tmrw-cool"><h4>Tomorrow is forecast to be ${tmrw}&nbsp;${dgrs}&nbsp;cooler than today,&nbsp;and conditions will be ${cond}.<h4></div>`;
    } else if (tmrw === 0) {
        tmrw = `<div class="tmrw-same"><h4>Tomorrow is forecast to be the same temperature as today, and conditions will be ${cond}.</h4></div>`;
    } else {
        tmrw = `<div class="bg-warning tmrw-warm"><h4>Tomorrow is forecast to be ${tmrw}&nbsp;${dgrs}&nbsp;warmer than today,&nbsp;and conditions will be ${cond}.</h4></div>`;
    }
    
    if (wxupdated.getHours() > 22) {
        stdy = 1;
    } else {
        stdy = 0;
    }
    
    let almanac = `<div class="bg-warning almanac"><h4>Sunrise:&nbsp;${data.sun_phase.sunrise.hour}:${data.sun_phase.sunrise.minute}&nbsp;${ampm(data.sun_phase.sunrise.hour)}<br>Sunset:&nbsp;${twelveHour(data.sun_phase.sunset.hour)}:${data.sun_phase.sunset.minute}&nbsp;${ampm(data.sun_phase.sunset.hour)}</h4></div>`;
    
    let tenday = "<table class='table noselect'><tr>";
    for (let i = stdy; i < fc.length; i++) {
        tenday += `<td class='spacertd'></td><td class="wxfct bg-primary highlight"><strong>${fc[i].date.weekday_short}<br>`;
        tenday += `${fc[i].date.month}/${fc[i].date.day}<br>`;
        tenday += `<img class='wxico' src='https://icons.wxug.com/i/c/v4/${fc[i].icon}.svg'><br>`;
        tenday += `High: ${fc[i].high.fahrenheit} &deg;F<br>`;
        tenday += `Low: ${fc[i].low.fahrenheit} &deg;F<br>`;
        tenday += `${fc[i].avewind.mph} MPH<br>`;
        tenday += `${fc[i].avewind.dir}<br>`;
        tenday += `POP: ${fc[i].pop}&#37;</strong>`;
        tenday += `</td>`;
    }
    tenday += "<td class='spacertd'></tr></table>"
    tenday += `<div class="text-center">
            <div class="btn-group">
                <button type="button" class="btn btn-success btn-xs" id="geobtn" onclick="getLocation();setLocTag('Geolocation');">Use Geolocation</button>
                <button type="button" class="btn btn-warning btn-xs" onclick="wxEntry();">Change Location</button>
                <div class="btn-group dropup">
                    <button type="button" class="btn btn-warning btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a onclick='weather("PWS:KCAATASC45");setLocTag("home");' class="awnhref">Home</a></li>
                        <li><a onclick='weather(93422);setLocTag("atas");' class="awnhref">Atascadero</a></li>
                        <li><a onclick='weather(93401);setLocTag("slo");' class="awnhref">SLO</a></li>
                        <li><a onclick='weather("PWS:KCASANLU39");setLocTag("cp");' class="awnhref">Cal Poly</a></li>
                    </ul>
                </div>
                <button type="button" class="btn btn-danger btn-xs" onclick="hideWeather();">Hide Weather</button>
            </div>
        </div>`
    wxupdated = `${wxupdated.getFullYear()}-${wxmo}-${wxdy}&nbsp;at&nbsp;${twelveHour(wxhr)}:${wxmn}&nbsp;${ampm(wxhr)}`;
    $('#weather-version').html(`<strong>Weather data updated ${wxupdated}</strong>`);
    $('#weather').html(`
                        ${almanac}
                        ${tmrw}

                        <h2>Weather in ${cu.display_location.city}</h2>
                        <span id="loctag" class="${color} noselect">${locTag}</span>
                        <h4>Conditions are ${cu.weather.toLowerCase()}</h4>
                        <h4>Temperature: ${cu.temp_f} &deg;F | Wind: ${wind} MPH | Humidity: ${cu.relative_humidity}</h4>
                        <h3>10 Day Forecast</h3>
                        <div>${tenday}</div>
                        `);
}

function times() {
    'use strict';
    startTime();
    showTime();
}

function update() {
    'use strict';
    updateLM();
    updateLinks();
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
    case "Geolocation":
        locTag = "Geolocation";
        color = "bg-success";
        break;
    default:
        locTag = loc;
        color = "bg-danger";
    }
}
