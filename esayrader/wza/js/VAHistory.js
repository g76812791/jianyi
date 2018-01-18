VAHistory = function(w, changed) {
    this.window = w ? w : window;
    this.changed = changed;
    this.backs = [];
    this.forwards = [];
    this.last = null;

    this.isBack = false;
    this.isForward = false;
    this.isRefresh = false;

    this.back = jQuery.proxy(this.back, this);
    this.forward = jQuery.proxy(this.forward, this);
}

VAHistory.prototype = {
    active: function () {
        var title = this.window.document.title;
        var url = this.window.location.href;

        if (this.last && url != this.last.url) {
            this.backs.push(this.last);
        }

        this.last = { title: title, url: url };

        if (!this.isBack && !this.isForward && !this.isRefresh) {
            this.forwards = [];
        }

        if (jQuery.isFunction(this.changed)) {
            this.changed();
        }

        this.isBack = false;
        this.isForward = false;
        this.isRefresh = false;
    },

    canBack: function() {
        return this.backs.length > 0;
    },

    canForward: function() {
        return this.forwards.length > 0;
    },

    back: function() {
        if (this.canBack()) {
            if (this.last) {
                this.forwards.push(this.last);
            }

            this.last = this.backs.pop();
            this.isBack = true;
            this.window.location.href = this.last.url;
        }
    },

    forward: function() {
        if (this.canForward()) {
            if (this.last) {
                this.backs.push(this.last);
            }

            this.last = this.forwards.pop();
            this.isForward = true;
            this.window.location.href = this.last.url;
        }
    }
}