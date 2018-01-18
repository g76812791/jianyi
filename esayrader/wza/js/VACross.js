VACross = function(w, show) {
    this.window = w ? w : window;
    this.isShow = !!show;

    this.move = jQuery.proxy(this.move, this);
    this.show = jQuery.proxy(this.show, this);
    this.hide = jQuery.proxy(this.hide, this);
    this.active = jQuery.proxy(this.active, this);
}

VACross.prototype = {
    active: function() {
        this.x = jQuery("<div va='cross' id='x' style='display:none;width:100%;height:5px;background:#ff0000 !important;position:absolute;z-index:1000;top:-10;left:-10;'></div>");
        this.y = jQuery("<div va='cross' id='y' style='display:none;width:5px;height:100%;background:#ff0000 !important;position:absolute;z-index:1000;top:-10;left:-10;'></div>");

        jQuery(this.window.document.body).append(this.x);
        jQuery(this.window.document.body).append(this.y);

        if (this.isShow) {
            this.show();
        }
        else {
            this.hide();
        }
    },

    move: function(event) {
        d = event.pageX,
        c = event.pageY;

        var st = this.window.document.documentElement.scrollTop ? this.window.document.documentElement.scrollTop : this.window.document.body.scrollTop;
        var sl = this.window.document.documentElement.scrollLeft ? this.window.document.documentElement.scrollLeft : this.window.document.body.scrollLeft;

        this.x.offset({ top: c - 6, left: sl });
        this.y.offset({ top: st, left: d - 6 });
    },

    show: function() {
        this.x.show();
        this.y.show();
        jQuery(this.window.document).bind("mousemove", this.move);
        jQuery(this.window).bind("scroll", this.move);
        this.isShow = true;
    },

    hide: function() {
        this.x.hide();
        this.y.hide();
        jQuery(this.window.document).unbind("mousemove", this.move);
        jQuery(this.window).unbind("scroll", this.move);
        this.isShow = false;
    }
}
