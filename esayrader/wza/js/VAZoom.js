VAZoom = function(w, zoom) {
    this.window = w ? w : window;
    this.zoom = zoom ? zoom : 1.0;
    this.zoomMax = 4.0;
    this.zoomMin = 0.5;

    this.zoomIn = jQuery.proxy(this.zoomIn, this);
    this.zoomOut = jQuery.proxy(this.zoomOut, this);
    this.doZoom = jQuery.proxy(this.doZoom, this);
    this.ratio = jQuery.proxy(this.ratio, this);
    this.active = jQuery.proxy(this.active, this);
}

VAZoom.prototype = {
    active: function () {
        this.doZoom();
    },

    zoomIn: function() {
        this.zoom -= 0.1;
        this.doZoom(this.zoom);
        return this.zoom - this.zoomMin > 0.05;
    },

    zoomOut: function() {
        this.zoom += 0.1;
        this.doZoom(this.zoom);
        return this.zoomMax - this.zoom > 0.05;
    },

    ratio: function(zoom) {
        if (zoom) {
            this.zoom = parseFloat(zoom);
            this.doZoom(this.zoom);
        }
        else {
            return this.zoom;
        }
    },

    doZoom: function() {
        var b = jQuery(this.window.document.body);
        var w = b.outerWidth();
        var h = b.outerHeight();

        if (jQuery.browser.mozilla) {
            b.css({ 'margin-top': h * (this.zoom - 1) / 2, '-moz-transform': 'scale(' + this.zoom + ')' })
        }
        else {
            b.css('zoom', this.zoom);
            document.scrollLeft = w * (this.zoom - 1) / 2;
            try {
                this.window.document.body.scrollLeft = w.width * (this.zoom - 1) / 2
            }
            catch (d) { }
        }
    }
}