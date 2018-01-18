VAFocus = function (w, changed, color, linkColor, bgColor) {
    this.window = w ? w : window;
    this.changed = changed;
    this.color = color ? color : "";
    this.linkColor = linkColor ? linkColor : "";
    this.bgColor = bgColor ? bgColor : "";

    this.active = jQuery.proxy(this.active, this);
    this.reset = jQuery.proxy(this.reset, this);
    this.paint = jQuery.proxy(this.paint, this);
    this.mouseOver = jQuery.proxy(this.mouseOver, this);
    this.mouseOut = jQuery.proxy(this.mouseOut, this);
    this.focusNext = jQuery.proxy(this.focusNext, this);
    this.clearFocusNext = jQuery.proxy(this.clearFocusNext, this);
    this.focus = jQuery.proxy(this.focus, this);
    this.blur = jQuery.proxy(this.blur, this);
    this.getText = jQuery.proxy(this.getText, this);

    this.elements = [];
    this.current = null;
    this.useFocusNext = false;
    this.nextFocus = null;
}

VAFocus.prototype = {
    active: function () {
        this.elements = [];
        this.current = null;
        this.elements = jQuery("a, span, img, input, button, select, textarea, li, b, i, strong, h1, h2, h3, h4, h5, h6, font, p, div, td", this.window.document)
        .not("a *")
        .bind("mouseover", this.mouseOver)
        .bind("mouseout", this.mouseOut);
    },

    reset: function () {
        this.color = "";
        this.linkColor = "";
        this.bgColor = "";
    },

    paint: function (color, linkColor, bgColor) {
        this.color = color;
        this.linkColor = linkColor;
        this.bgColor = bgColor;
    },

    mouseOver: function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        var t = e.currentTarget;

        if (!this.useFocusNext) {
            this.focus(t);
        }
        else {
            if (jQuery.inArray(t.tagName, ["A", "SPAN", "B", "H1", "H2", "H3", "H4", "H5", "H6", "FONT", "STRONG", "I", "LI", "P"]) > -1) {
                this.nextFocus = t;
            }
            else {
                this.nextFocus = null;
            }
        }
    },

    mouseOut: function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        var t = e.currentTarget;

        if (!this.useFocusNext) {
            this.blur(t);
        }
        else {
            this.nextFocus = null;
        }
    },

    focusNext: function () {
        if (this.nextFocus && this.nextFocus != this.current) {
            var t = this.nextFocus;
            this.nextFocus = null;

            this.focus(t);
            return;
        }

        var index = this.elements.index(this.current);
        var old = this.current;
        while (index != 1 && index > -1 && ++index < this.elements.length) {
            this.current = this.elements[index];

            if (this.getText() != "") {
                this.useFocusNext = true;
                this.blur(old);
                this.nextFocus = null;
                this.focus(this.current);
                return;
            }
        }

        this.useFocusNext = false;
    },

    clearFocusNext: function () {
        this.useFocusNext = false;
        this.nextFocus = null;
    },

    focus: function (t) {
        if (this.current) {
            this.blur(this.current);
        }
        this.current = t;
        var color = this.color;
        var linkColor = this.linkColor;
        var bgColor = this.bgColor;

        if (!color) {
            color = "Blue";
        }
        if (!linkColor) {
            linkColor = "Black";
        }
        if (!bgColor) {
            bgColor = "Yellow";
        }

        switch (t.tagName) {
            case "A":
                jQuery(t).css("background", linkColor).css("color", bgColor).focus();
                break;
            case "SPAN":
            case "IMG":
            case "INPUT":
            case "BUTTON":
            case "SELECT":
            case "TEXTAREA":
            case "B":
            case "H1":
            case "H2":
            case "H3":
            case "H4":
            case "H5":
            case "H6":
            case "FONT":
            case "STRONG":
            case "I":
            case "LI":
            case "P":
                jQuery(t).css("background", color).css("color", bgColor).focus();
                break;
        }

        if (jQuery.isFunction(this.changed)) {
            this.changed(this);
        }
    },

    blur: function (t) {
        switch (t.tagName) {
            case "A":
                jQuery(t).css("background", this.bgColor).css("color", this.linkColor).blur();
                break;
            case "SPAN":
            case "IMG":
            case "INPUT":
            case "BUTTON":
            case "SELECT":
            case "TEXTAREA":
            case "B":
            case "H1":
            case "H2":
            case "H3":
            case "H4":
            case "H5":
            case "H6":
            case "FONT":
            case "STRONG":
            case "I":
            case "LI":
            case "P":
                jQuery(t).css("background", this.bgColor).css("color", this.color).blur();
                break;
        }
    },

    getText: function () {
        var node = this.current;
        var t = "";

        switch (node.tagName) {
            case "DIV":
            case "TD":
            case "P":
            case "SPAN":
            case "LI":
                for (var i = 0; i < node.childNodes.length; i++) {
                    if (node.childNodes[i].nodeType == 3) {
                        t += node.childNodes[i].data;
                    }
                    else if (node.childNodes[i].tagName == "OBJECT" || node.childNodes[i].tagName == "EMBED") {
                        t = "媒体";
                    }
                }
                break;
            case "IMG":
                if (!!jQuery(node).attr("title")) {
                    t = "图片：" + jQuery(node).attr("title");
                }
                else if (!!jQuery(node).attr("alt")) {
                    t = "图片：" + jQuery(node).attr("alt");
                }
                else {
                    t = "图片";
                }
                break;
            case "A":
                if (!!jQuery(node).attr("title")) {
                    t = jQuery(node).attr("title");
                }
                else {
                    t = jQuery(node).text();
                }
                t = jQuery.trim(t);
                if (t) {
                    t = "链接：" + t;
                }
                break;
            case "OBJECT":
            case "EMBED":
                t = "媒体";
                break;
            case "TEXTAREA":
                t = "文本框：" + jQuery(node).val();
                break;
            case "INPUT":
                var type = jQuery(node).attr("type");
                switch (type) {
                    case "text":
                        t = "文本框：" + jQuery(node).val();
                        break;
                    case "password":
                        t = "密码框：" + jQuery(node).val();
                        break;
                    case "button":
                        t = "按钮" + jQuery(node).val();
                        break;
                    case "radio":
                        t = "单选框：" + jQuery(node).attr("checked") ? "选中" : "未选中";
                        break;
                    case "checkbox":
                        t = "复选框：" + jQuery(node).attr("checked") ? "选中" : "未选中";
                        break;
                }
                break;
            case "SELECT":
                for (var i = 0; i < node.childNodes.length; i++) {
                    if (node.childNodes[i].value == node.value) {
                        t = "选项：" + jQuery(node.childNodes[i]).text();
                        break;
                    }
                }
                break;
            default:
                t = jQuery(node).text();
        }

        return jQuery.trim(t);
    }
}