VAScroll = function(w) {
    this.window = w ? w : window;

    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;

    this.speed = 1;

    this.scrollDown = jQuery.proxy(this.scrollDown, this);
    this.scrollUp = jQuery.proxy(this.scrollUp, this);
    this.scrollRight = jQuery.proxy(this.scrollRight, this);
    this.scrollLeft = jQuery.proxy(this.scrollLeft, this);

    this.mousemove = jQuery.proxy(this.mousemove, this);

    this.getScrollVars = jQuery.proxy(this.getScrollVars, this);
}

VAScroll.prototype = {
    active: function() {
        jQuery(this.window.document).bind("mousemove", this.mousemove);
    },

    mousemove: function(e) {
        var vars = this.getScrollVars();

        var d = e.pageY - vars.st;
        if (10 < d && d < 50) {
            this.speed = d < 30 ? 5 : 1;
            if (!this.up) {
                this.up = setTimeout(this.scrollUp, 300);
            }
        }
        else {
            if (this.up) {
                clearTimeout(this.up);
                this.up = null;
            }
        }

        d = vars.h + vars.st - e.pageY;
        if (10 < d && d < 50) {
            this.speed = d < 30 ? 5 : 1;
            if (!this.down) {
                this.down = setTimeout(this.scrollDown, 300);
            }
        }
        else {
            if (this.down) {
                clearTimeout(this.down);
                this.down = null;
            }
        }

        d = e.pageX - vars.sl;
        if (10 < d && d < 50) {
            this.speed = d < 30 ? 5 : 1;
            if (!this.left) {
                this.left = setTimeout(this.scrollLeft, 300);
            }
        }
        else {
            if (this.left) {
                clearTimeout(this.left);
                this.left = null;
            }
        }

        d = vars.w + vars.sl - e.pageX;
        if (10 < d && d < 50) {
            this.speed = d < 30 ? 5 : 1;
            if (!this.right) {
                this.right = setTimeout(this.scrollRight, 300);
            }
        }
        else {
            if (this.right) {
                clearTimeout(this.right);
                this.right = null;
            }
        }

    },

    scrollDown: function() {
        var vars = this.getScrollVars();

        if (vars.h + vars.st < vars.sh) {
            this.window.scrollTo(vars.sl, vars.st + this.speed);
            this.down = setTimeout(this.scrollDown, 50);
        }
    },

    scrollUp: function() {
        var vars = this.getScrollVars();

        if (vars.st > 0) {
            this.window.scrollTo(vars.sl, vars.st - this.speed);
            this.up = setTimeout(this.scrollUp, 50);
        }
    },

    scrollRight: function() {
        var vars = this.getScrollVars();

        if (vars.w + vars.sl < vars.sw) {
            this.window.scrollTo(vars.sl + this.speed, vars.st);
            this.right = setTimeout(this.scrollRight, 50);
        }
    },

    scrollLeft: function() {
        var vars = this.getScrollVars();

        if (vars.sl > 0) {
            this.window.scrollTo(vars.sl - this.speed, vars.st);
            this.left = setTimeout(this.scrollLeft, 50);
        }
    },

    getScrollVars: function() {
        var vars = {};

        if (this.window.document.documentElement.clientHeight) {
            vars.st = this.window.document.documentElement.scrollTop;
            vars.sl = this.window.document.documentElement.scrollLeft;
            vars.sw = this.window.document.documentElement.scrollWidth;
            vars.sh = this.window.document.documentElement.scrollHeight;
            vars.w = this.window.document.documentElement.clientWidth;
            vars.h = this.window.document.documentElement.clientHeight;
        }
        else {
            vars.st = this.window.document.body.scrollTop;
            vars.sl = this.window.document.body.scrollLeft;
            vars.sw = this.window.document.body.scrollWidth;
            vars.sh = this.window.document.body.scrollHeight;
            vars.w = this.window.document.body.clientWidth;
            vars.h = this.window.document.body.clientHeight;
        }

        return vars;
    }
}

