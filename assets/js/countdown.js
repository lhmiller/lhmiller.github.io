var CDown = function () {
    this.state = 0;
    this.counts = [];
    this.interval = null;
};
CDown.prototype = {
    init: function() {
        this.state = 1;
        var t = this;
        this.interval = window.setInterval(function() {
            t.tick()
        }, 25)
    },
    add: function(t, i) {
        this.counts.push({
            d: t,
            id: i
        }), this.tick(), 0 == this.state && this.init()
    },
    expire: function(t) {
        for (var i in t) this.display(this.counts[t[i]], "0 secs"), this.counts.splice(t[i], 1)
    },
    format: function(t) {
        var i = "";
        return 0 != t.d && (i += t.d + " " + (1 == t.d ? "day" : "days") + ", "), 0 != t.h && (i += t.h + " " + (1 == t.h ? "hour" : "hours") + ", "), 0 != t.m && (i += t.m + " " + (1 == t.m ? "min" : "mins") + ", "), i += t.s + ("." + t.ms) + " " + (1 == t.s ? "sec" : "secs") + ", ", i.substr(0, i.length - 2)
    },
    math: function(t) {
        var i = w = d = h = m = s = ms = 0;
        return ms = ("" + (t % 1e3 + 1e3)).substr(1, 2), t = Math.floor(t / 1e3), i = Math.floor(t / 31536e3), w = Math.floor(t / 604800), d = Math.floor(t / 86400), t %= 86400, h = Math.floor(t / 3600), t %= 3600, m = Math.floor(t / 60), t %= 60, s = Math.floor(t), {
            y: i,
            w: w,
            d: d,
            h: h,
            m: m,
            s: s,
            ms: ms
        }
    },
    tick: function() {
        var t = (new Date).getTime(),
            i = [],
            n = 0,
            s = 0;
        if (this.counts)
            for (var o = 0, h = this.counts.length; h > o; ++o) n = this.counts[o], s = n.d.getTime() - t, 0 > s ? i.push(o) : this.display(n, this.format(this.math(s)));
        i.length > 0 && this.expire(i), 0 == this.counts.length && window.clearTimeout(this.interval)
    },
    display: function(t, i) {
        document.getElementById(t.id).innerHTML = i
    }
}, window.onload = function() {
    var t = new CDown;
//    t.add(new Date(2016, 5, 6, 12, 0, 0), "mbpay");
//    t.add(new Date(2016, 5, 6, 12, 0, 0), "cg");
//    t.add(new Date(2016, 5, 10, 12, 0, 0), "rnpay");
//    t.add(new Date(2016, 5, 11, 12, 0, 0), "mo");
};
