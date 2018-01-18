VAColor = function(w, color, linkColor, bgColor) {
    this.window = w ? w : window;
    this.color = color;
    this.linkColor = linkColor;    
    this.bgColor = bgColor;

    this.area = "a, span, img, input, button, select, textarea, li, b, i, strong, h1, h2, h3, h4, h5, h6, font, p, div, td, form, body";
    
    this.reset = jQuery.proxy(this.reset, this);
    this.paint = jQuery.proxy(this.paint, this);
    this.active = jQuery.proxy(this.active, this);
}

VAColor.prototype = {
    active: function() {
        if (this.color) {
            jQuery(this.area, this.window.document).css({ "color": this.color, "background": this.bgColor }).find("a").css("color", this.linkColor);
            jQuery("#x, #y", this.window.document).css("background", "red");
        }
    },

    paint: function(color, linkColor, bgColor) {
        this.color = color;
        this.linkColor = linkColor;    
        this.bgColor = bgColor;
        
        jQuery(this.area, this.window.document).css({ "color": this.color, "background": this.bgColor }).find("a").css("color", this.linkColor);
        jQuery("#x, #y", this.window.document).css("background", "red");
    },

    reset: function() {
        this.color = "";
        this.linkColor = "";    
        this.bgColor = "";

        this.window.location.reload();
    }
}