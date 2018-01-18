Mask = function (w, element) {
    this.window = w;
    this.element = document.getElementById(element);
    this.element.style.display = "none";
    this.showing = false;

    this.show = jQuery.proxy(this.show, this);
    this.move = jQuery.proxy(this.move, this);
    this.walk = jQuery.proxy(this.walk, this);
    this.resize = jQuery.proxy(this.resize, this);
    this.close = jQuery.proxy(this.close, this);
    this.active = jQuery.proxy(this.active, this);
}

Mask.prototype = {
    cover: null,

    ensureCover: function () {
        this.cover = document.getElementById("__ess_PopupBackCover");
        if (!this.cover) {
            var cover = document.createElement("DIV");
            cover.id = "__ess_PopupBackCover";
            cover.style.position = "absolute";
            cover.style.width = "0px";
            cover.style.height = "0px";
            cover.style.display = "none";
            cover.style.backgroundColor = "#666666";
            cover.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=50)";
            cover.style.top = "0px";
            cover.style.left = "0px";
            cover.style.opacity = "0.5";
            cover.style.mozopacity = "0.5";

            document.body.appendChild(cover);
            this.cover = document.getElementById("__ess_PopupBackCover");

            if (document.attachEvent) {
                var ifr = document.createElement("IFRAME");
                ifr.frameBorder = "0";
                ifr.style.width = "100%";
                ifr.style.height = "100%";
                this.cover.appendChild(ifr);

                var c = document.createElement("DIV");
                c.style.position = "absolute";
                c.style.width = "100%";
                c.style.height = "100%";
                c.style.backgroundColor = "#666666";
                c.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=50)";
                c.style.top = "0px";
                c.style.left = "0px";
                c.style.opacity = "0.5";
                c.style.mozopacity = "0.5";
                this.cover.appendChild(c);
            }
        }
    },

    show: function () {
        this.ensureCover();

        this.cover.style.position = "absolute";
        this.cover.style.top = "0px";
        this.cover.style.left = "0px";
        this.cover.style.zIndex = "999999";

        this.element.style.position = "absolute";
        this.element.style.zIndex = "1000000";

        this.cover.style.display = "block";
        this.element.style.display = "block";

        this.resize();

        if (window.attachEvent) {
            window.attachEvent("onresize", this.resize);
            window.attachEvent("onscroll", this.move);
        }
        else {
            window.addEventListener("resize", this.resize, false);
            window.addEventListener("scroll", this.move, false);
        }

        this.showing = true;
    },

    close: function (elementOnly) {
        if (window.attachEvent) {
            window.detachEvent("onresize", this.resize);
            window.detachEvent("onscroll", this.move);
        }
        else {
            window.removeEventListener("resize", this.resize, false);
            window.removeEventListener("scroll", this.move, false);
        }

        this.element.style.display = "none";
        this.showing = false;
        if (elementOnly && elementOnly === true) {
            return;
        }

        this.cover.style.display = "none";
    },

    resize: function () {
        var w, h;
        if (window.innerWidth) {
            w = window.innerWidth;
            h = window.innerHeight;
        }
        else if (document.documentElement.clientWidth) {
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        }
        else {
            w = document.body.clientWidth;
            h = document.body.clientHeight;
        }
        this.cover.style.width = w + "px";
        this.cover.style.height = h + "px";

        this.position();

        this.element.style.top = this.top + "px";
        this.element.style.left = this.left + "px";
    },

    move: function () {
        if (this.position()) {

            if (this.walkHandle) {
                clearTimeout(this.walkHandle);
            }
            this.walkHandle = setTimeout(this.walk, 300);
        }
    },

    position: function () {
        var st = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        var sl = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;

        var w, h;
        if (window.innerWidth) {
            w = window.innerWidth;
            h = window.innerHeight;
        }
        else if (document.documentElement.clientWidth) {
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        }
        else {
            w = document.body.clientWidth;
            h = document.body.clientHeight;
        }

        this.top = (h - this.element.clientHeight) / 2 + st;
        this.left = (w - this.element.clientWidth) / 2 + sl;

        if (this.top < 0) this.top = 0;
        if (this.left < 0) this.left = 0;

        return h >= this.element.clientHeight && w >= this.element.clientWidth;
    },

    top: 0,
    left: 0,
    step: 10,
    rate: 10,
    walkHandle: null,

    walk: function () {
        var g = false;
        var d = 0;
        var t = parseInt(this.element.style.top);
        var l = parseInt(this.element.style.left);

        d = t > this.top ? -1 : 1;
        if (d != 0 && Math.abs(t - this.top) < this.step) {
            this.element.style.top = this.top + "px";
        }
        else {
            t += d * this.step;
            this.element.style.top = t + "px";
            g = true;
        }

        d = 0;
        d = l > this.left ? -1 : 1;
        if (d != 0 && Math.abs(l - this.left) < this.step) {
            this.element.style.left = this.left + "px";
        }
        else {
            l += d * this.step;
            this.element.style.left = l + "px";
            g = true;
        }


        if (this.walkHandle) {
            clearTimeout(this.walkHandle);
        }
        if (g) {
            this.walkHandle = setTimeout(this.walk, this.rate);
        }
    },

    active: function () {
        this.close();
        jQuery(this.window).unload(this.show);
    }
}