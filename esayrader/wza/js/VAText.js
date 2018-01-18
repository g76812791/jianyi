VAText = function(w) {
    this.window = w ? w : window;
    this.isText = false;

    this.text = jQuery.proxy(this.text, this);
    this.reset = jQuery.proxy(this.reset, this);
    this.active = jQuery.proxy(this.active, this);
}

VAText.prototype = {
    active: function() {
        if (this.isText) {
            this.text();
        }
    },

    text: function() {
        this.isText = true;
        var c = jQuery(this.window.document)[0];
        jQuery(this.window.document).find("link, style").remove().end()
        .find("img").each(function() {
            var d = this.alt || this.title;
            if (d) {
                var e = c.createElement("span");
                e.innerHTML = d;
                this.parentNode.insertBefore(e, this)
            }
            jQuery(this).remove()
        })
        .end().find("iframe").each(function() {
            try {
                var g = this.contentWindow,
                d = g.document.getElementsByTagName("body")[0].innerHTML,
                h = c.createElement("div");
                h.innerHTML = d;
                this.parentNode.insertBefore(h, this)
            }
            catch (f) { }
            jQuery(this).remove()
        }).end().find("*").not("script, div[va=cross]").css("display", "block");
    },

    reset: function() {
        this.isText = false;
        this.window.location.reload();
    }
}