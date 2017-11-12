"use strict";

var textElem = document.getElementById("clocktext");
var textNode = document.createTextNode("");
textElem.appendChild(textNode);
var targetWidth = 0.9;  // Proportion of full screen width
var curFontSize = 20;  // Do not change

function updateClock() {
    var d = new Date();
    var s = "";
    s += ((d.getHours() + 11) % 12 + 1) + ":";
    s += (10 > d.getMinutes() ? "0" : "") + d.getMinutes() + ":";
    s += (10 > d.getSeconds() ? "0" : "") + d.getSeconds() + "\u00A0";
    s += d.getHours() >= 12 ? "pm" : "am";
    textNode.data = s;
    setTimeout(updateClock, 1000 - d.getTime() % 1000 + 20);
}

function updateTextSize() {
    for (var i = 0; 3 > i; i++) {  // Iterate for better better convergence
        curFontSize *= targetWidth / (textElem.offsetWidth / textElem.parentNode.offsetWidth);
        textElem.style.fontSize = curFontSize + "pt";
    }
}

updateClock();
updateTextSize();
startTime();
window.addEventListener("resize", updateTextSize);