var partno, groups = { 01: "Technical Literature", 02: "Scopes of Service and repair work (new category)", 11: "Engine Mechanical", 12: "Engine Electrical", 13: "Fuel Injection", 16: "Fuel Supply", 17: "Cooling System", 18: "Exhaust", 21: "Clutch", 22: "Engine and gearbox suspension", 23: "Standard Transmission", 24: "Automatic Transmission", 25: "Gearshift", 26: "Drive Shaft", 27: "Transfer case", 28: "Dual Clutch Transmission", 31: "Front suspension", 32: "Steering components", 33: "Rear suspension", 34: "Braking components", 35: "Pedals", 36: "Wheels", 41: "Bodywork", 51: "Vehicle trim", 52: "Seats", 54: "Sunroof/Convertible top", 61: "Body Electrical", 62: "Instrument Cluster", 63: "Lighting", 64: "Climate control", 65: "Audio, navigation, and electronic systems", 66: "Distance systems and cruise control", 67: "Window motors on newer BMW's", 71: "Equipment parts", 72: "Restraint systems", 82: "Universal Accessories", 84: "Communication systems", 88: "BMW specific tools" };

function makeLinks() {
    $("#pn").removeClass("is-valid");
    $("#pn").removeClass("is-invalid");
    if ($('#pn').val().replace(/\D/g, '').length != 11) {
        $("#pn").addClass("is-invalid");
        $("#part").html("");
        $(".btn")[0].disabled = true;
        $(".btn")[1].disabled = true;
        $(".btn")[2].disabled = true;
        $(".btn")[3].disabled = true;
        $(".btn")[4].disabled = true;
        $(".btn")[5].disabled = true;
        $(".btn")[6].disabled = true;
        $(".btn")[7].disabled = true;
    } else {
        $("#pn").addClass("is-valid");
        partno = $('#pn').val().replace(/\D/g, '');
        $("#part").html("Part: " + partno.substring(0, 2) + " " + partno.substring(2, 4) + " " + partno.substring(4, 5) + " " + partno.substring(5, 8) + " " + partno.substring(8, 11) + " ");
        $(".btn")[0].disabled = false;
        $(".btn")[1].disabled = false;
        $(".btn")[2].disabled = false;
        $(".btn")[3].disabled = false;
        $(".btn")[4].disabled = false;
        $(".btn")[5].disabled = false;
        $(".btn")[6].disabled = false;
        $(".btn")[7].disabled = false;
        $("#group").html(groups[partno.substring(0, 2)]);
    }
}