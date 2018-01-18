VAScreen = function(screen, show, w) {
    this.screen = screen;
    this.isShow = !!show;
    this.window = w ? w : window;
    
    this.init = jQuery.proxy(this.init, this);
    this.show = jQuery.proxy(this.show, this);
    this.hide = jQuery.proxy(this.hide, this);
    this.showText = jQuery.proxy(this.showText, this);

    this.init();
}

VAScreen.prototype = {
    init: function() {
        if (this.isShow) {
            this.show();
        }
        else {
            this.hide();
        }
    },

    show: function() {
        jQuery(this.screen).show();
        this.isShow = true;
    },

    hide: function() {
        jQuery(this.screen).hide();
        this.isShow = false;
    },

    showText: function(text) {
        var screen = jQuery(this.screen);
        if (text.length <= 14) {
            screen.css("font-size", "60px");
        }
        else {
            screen.css("font-size", "32px");
        }
        screen.html(text);
    }
}

