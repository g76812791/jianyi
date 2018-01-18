VAFont = function(w, fontSize) {
    this.window = w ? w : window;
    this.fontMax = 24;
    this.fontMin = 10;
    this.fontSize = fontSize ? fontSize : 12;
    this.area = "a, span, p, li, b, div, td, h1, h2, h3, h4, h5, h6, font";
    
    this.active = jQuery.proxy(this.active, this);
    this.fontPlus = jQuery.proxy(this.fontPlus, this);
    this.fontMinus = jQuery.proxy(this.fontMinus, this);
    this.size = jQuery.proxy(this.size, this);
}

VAFont.prototype = {
    active: function() {
        if (typeof (this.fontSize) == "number") {
            jQuery(this.area, this.window.document.body).css("font-size", this.fontSize);
        }
    },

    fontPlus: function() {
        if (typeof (this.fontSize) != "number") {
            this.fontSize = 12;
        }
        if (this.fontSize == this.fontMax) {
            return false;
        }

        this.fontSize += 2;

        if (this.fontSize > this.fontMax) {
            this.fontSize = this.fontMax;
        }

        jQuery(this.area, this.window.document.body).css("font-size", this.fontSize);
        return this.fontSize < this.fontMax;
    },

    fontMinus: function() {
        if (typeof (this.fontSize) != "number") {
            this.fontSize = 12;
        }
        if (this.fontSize == this.fontMin) {
            return false;
        }

        this.fontSize -= 2;

        if (this.fontSize < this.fontMin) {
            this.fontSize = this.fontMin;
        }

        jQuery(this.area, this.window.document.body).css("font-size", this.fontSize);
        return this.fontSize > this.fontMin;
    },

    size: function(s) {
        if (s) {
            this.fontSize = s;
            if (typeof (this.fontSize) == "number") {
                jQuery(this.area, this.window.document.body).css("font-size", this.fontSize);
            }
            else {
                jQuery(this.area, this.window.document.body).css("font-size", "");
            }
        }
        else {
            return this.fontSize;
        }
    }
}


