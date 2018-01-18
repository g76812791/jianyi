VATarget = function (w) {
    this.window = w ? w : window;
    this.clickHandler = jQuery.proxy(this.clickHandler, this);
}

VATarget.prototype = {
    active: function () {
		var l=this.window.frames.length;
        jQuery("A", this.window.document).click(this.clickHandler);
        if(l>0){
			for(var i=0;i<l;i++){
				try{
					jQuery("A", this.window.frames[i].document).click(this.clickHandler);
				}catch(e){}
			}
		}
    },

    clickHandler: function (e) {
        e.preventDefault();

        var href = jQuery(e.target).attr("href");
        if (href) {
            if (href.substring(0, 11) == "javascript:") {
                this.window.eval(href.substring(11));
                return;
            }
            else if (href.substring(0, 5) == "http:" || href.substring(0, 6) == "https:") {
                if (href.indexOf(Host.domain) > -1) {
                    this.window.document.location.href = href;
                }
                else {
                    this.window.open(href, "_blank");
                    return;
                }
            }
            else if (href.substring(0, 1) == "/") {
                href = this.window.document.location.protocol + "//" + this.window.document.location.host + href;
            }
            else if (href.substring(0, 1) == "#") {
                href = this.window.document.location.href + href;
            }
            else {
                var last = this.window.document.location.href.lastIndexOf("/");
                if (last > 7) {
                    href = this.window.document.location.href.substring(0, last + 1) + href;
                }
                else {
                    href = this.window.document.location.href + "/" + href;
                }
            }

            this.window.document.location.href = href;
        }
    }
}