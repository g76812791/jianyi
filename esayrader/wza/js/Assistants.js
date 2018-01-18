Assistant = function (startUrl) {
    this.startUrl = startUrl;
    this.frame = document.getElementById("frame");
    this.screen = document.getElementById("screen");

    this.mouseenter = jQuery.proxy(this.mouseenter, this);
    this.mouseleave = jQuery.proxy(this.mouseleave, this);
    this.mousemove = jQuery.proxy(this.mousemove, this);
    this.click = jQuery.proxy(this.click, this);
    this.dblclick = jQuery.proxy(this.dblclick, this);

    this.init = jQuery.proxy(this.init, this);
    this.frameFocusChanged = jQuery.proxy(this.frameFocusChanged, this);
    this.enable = jQuery.proxy(this.enable, this);
    this.disable = jQuery.proxy(this.disable, this);
    this.adjust = jQuery.proxy(this.adjust, this);
    this.historyChanged = jQuery.proxy(this.historyChanged, this);
    this.focusChanged = jQuery.proxy(this.focusChanged, this);
    this.screenFocus = jQuery.proxy(this.screenFocus, this);
    this.readerFocus = jQuery.proxy(this.readerFocus, this);
    this.split = jQuery.proxy(this.split, this);
    this.isSeparator = jQuery.proxy(this.isSeparator, this);
    this.initReader = jQuery.proxy(this.initReader, this);
    this.frameLoad = jQuery.proxy(this.frameLoad, this);
    this.toolFocus = jQuery.proxy(this.toolFocus, this);

    this.cmd_reset = jQuery.proxy(this.cmd_reset, this);
    this.cmd_back = jQuery.proxy(this.cmd_back, this);
    this.cmd_forward = jQuery.proxy(this.cmd_forward, this);
    this.cmd_refresh = jQuery.proxy(this.cmd_refresh, this);
    this.cmd_screen = jQuery.proxy(this.cmd_screen, this);
    this.cmd_zoomout = jQuery.proxy(this.cmd_zoomout, this);
    this.cmd_zoomin = jQuery.proxy(this.cmd_zoomin, this);
    this.cmd_fontplus = jQuery.proxy(this.cmd_fontplus, this);
    this.cmd_fontminus = jQuery.proxy(this.cmd_fontminus, this);
    this.cmd_cross = jQuery.proxy(this.cmd_cross, this);
    this.cmd_colors = jQuery.proxy(this.cmd_colors, this);
    this.cmd_text = jQuery.proxy(this.cmd_text, this);
    this.cmd_read = jQuery.proxy(this.cmd_read, this);
    this.cmd_readon = jQuery.proxy(this.cmd_readon, this);
    this.cmd_volumeplus = jQuery.proxy(this.cmd_volumeplus, this);
    this.cmd_volumeminus = jQuery.proxy(this.cmd_volumeminus, this);

    this.vAScreen = new VAScreen(this.screen, false, this.frame.contentWindow);
    this.vAZoom = new VAZoom(this.frame.contentWindow);
    this.vAFont = [new VAFont(this.frame.contentWindow, "auto")];
    this.vACross = new VACross(this.frame.contentWindow, false);
    this.vAColor = [new VAColor(this.frame.contentWindow)];
    this.vAText = new VAText(this.frame.contentWindow);
    this.vAHistory = new VAHistory(this.frame.contentWindow, this.historyChanged);
    this.vAFocus = [new VAFocus(this.frame.contentWindow, this.focusChanged)];
    this.vAScroll = new VAScroll(this.frame.contentWindow);
    this.vATarget = new VATarget(this.frame.contentWindow);
    this.mask = new Mask(this.frame.contentWindow, "loading");

    this.init();
}

Assistant.prototype = {
    init: function () {
        jQuery("#ribbon .bigtool, #ribbon .listitem")
        .bind("mouseenter", this.mouseenter)
        .bind("mouseleave", this.mouseleave)
        .bind("click", this.click)
        .bind("dblclick", this.dblclick);

        jQuery.cookie("ess.ss", '1', { path: '/' });
        jQuery.cookie("EasySite.SpeechAssistant", null, { path: '/' });

        jQuery(window).resize(this.adjust);

        jQuery(document.body).click(function (e) {
            jQuery(".dropdownlist").parent(".bigtool[cmd=colors]").removeClass("selected");
            jQuery(".dropdownlist").hide();
        });

        jQuery("#ribbon").mousedown(function (e) { e.preventDefault(); });

        jQuery(this.frame).bind("load", this.frameLoad);


        var reader=this.reader = new EasyReader({ speed: "slow", playerPath: Host.playerPath });
        this.initReader();

        this.adjust();
        this.mask.show();
        this.frame.src = this.startUrl;

		var me=this;
		$(document).keydown(this.shortcuts);
		setTimeout(function(){
			me.readerFocus('欢迎使用无障碍系统,按住shift+1打开显示屏，再次按下关闭显示屏，按住shift+2打开指读功能，再次按下关闭',me.vAFocus[0],true);
		},1000);
		
    },

    initReader: function () {
        this.disable(jQuery(".bigtool[cmd=read]")[0]);
        this.disable(jQuery(".bigtool[cmd=readon]")[0]);
        this.disable(jQuery(".bigtool[cmd=volumeplus]")[0]);
        this.disable(jQuery(".bigtool[cmd=volumeminus]")[0]);

        this.canRead = false;
        this.canReadon = false;

        if (this.reader.isEnable()) {
            this.enable(jQuery(".bigtool[cmd=read]")[0]);

            this.reader.volume(1);

            if (this.reader.canVolumePlus()) {
                this.enable(jQuery(".bigtool[cmd=volumeplus]")[0]);
            }
            if (this.reader.canVolumeMinus()) {
                this.enable(jQuery(".bigtool[cmd=volumeminus]")[0]);
            }
        }
    },

    frameLoad: function (e) {
        document.title = this.frame.contentWindow.document.title;
        this.reader._reader._args.mp3Path = Host.getCurrent(this.frame.contentWindow).mp3Path;
		this.vAFont.length=1;
		this.vAColor.length=1;
		this.vAFocus.length=1;

        this.vAHistory.active();
        this.vACross.active();
        this.vAZoom.active();
        this.vAFont[0].active();
        this.vAColor[0].active();
        this.vAText.active();
        this.vAFocus[0].active();
        this.vAScroll.active();
        this.vATarget.active();
        this.mask.active();
		var win=this.frame.contentWindow;
		$(win.document).keydown(this.shortcuts);
		var winframes=win.frames;
		for(var i=0,l=winframes.length;i<l;i++){
			try{
				$(winframes[i].document).keydown(this.shortcuts);
				var focus = new VAFocus(winframes[i].window, this.frameFocusChanged),
					font = new VAFont(winframes[i].window, "auto"),
					color = new VAColor(winframes[i].window);
				this.vAFont.push(font);
				this.vAColor.push(color);
				this.vAFocus.push(focus);
				focus.active();
				font.active();
				color.active();
			}catch(e){}
		}
    },
	
	frameFocusChanged:function(Focus){
        var text = Focus.getText();

        if (text.length > 0) {
            if (this.canRead) {
                this.readerFocus(text,Focus);
            }
            else {
                if (this.vAScreen.isShow) {
                    this.screenFocus(text,Focus);
                }
            }
        }
        else {
            if (this.canReadon) {
                Focus.focusNext();
            }
        }
	},
	shortcuts: function(e){
		var cmd="";

		e.preventDefault();

		if(e.shiftKey){

			switch(e.keyCode){
				case 49:
					cmd="screen";
					break;
				case 50:
					cmd="read";
					break;
			}

			$("#ribbon .bigtool[cmd='"+cmd+"']",window.top.document).trigger("click");

		}
	},

    toolFocus: function (tool) {
        var title = jQuery("span:nth(0)", tool).text();
        var cmd = jQuery(tool).attr("cmd");

        switch (cmd) {
            case "screen":
                if (this.vAScreen.isShow) {
                    title += "【开】";
                }
                else {
                    title += "【关】";
                }
                break;
            case "text":
                if (this.vAText.isText) {
                    title += "【开】";
                }
                else {
                    title += "【关】";
                }
                break;
            case "cross":
                if (this.vACross.isShow) {
                    title += "【开】";
                }
                else {
                    title += "【关】";
                }
                break;
            case "read":
                if (this.canRead) {
                    title += "【开】";
                }
                else {
                    title += "【关】";
                }
                break;
            case "readon":
                if (this.canReadon) {
                    title += "【开】";
                }
                else {
                    title += "【关】";
                }
                break;
            case "fontminus":
            case "fontplus":
				var l=this.vAFont.length,
					tag=true;

				for(var i=0;i<l;i++){
					tag=(this.vAFont[i].size() != "auto")&&tag
				}
                if (tag) {
                    title += "【" + this.vAFont[0].size() + "】";
                }
                else {
                    title += "【正常】";
                }
                break;
            case "zoomin":
            case "zoomout":
                title += "【" + parseInt(this.vAZoom.ratio() * 100) + "%】";
                break;
            case "volumeplus":
            case "volumeminus":
                title += "【" + parseInt(this.reader.volume().toFixed(1) * 100) + "%】";
                break;
        }

        this.focusChanged(title);
    },

    mouseenter: function (e) {
        jQuery(e.currentTarget).addClass("active");
        this.toolFocus(e.currentTarget);
    },

    mouseleave: function (e) {
        jQuery(e.currentTarget).removeClass("active");
        this.vAScreen.showText("");
    },

    click: function (e) {
        var cmd = jQuery(e.currentTarget).attr("cmd");
        switch (cmd) {
            case "reset":
                this.cmd_reset(e);
                break;
            case "back":
                this.cmd_back(e);
                break;
            case "forward":
                this.cmd_forward(e);
                break;
            case "refresh":
                this.cmd_refresh(e);
                break;
            case "screen":
                this.cmd_screen(e);
                break;
            case "zoomout":
                this.cmd_zoomout(e);
                break;
            case "zoomin":
                this.cmd_zoomin(e);
                break;
            case "fontplus":
                this.cmd_fontplus(e);
                break;
            case "fontminus":
                this.cmd_fontminus(e);
                break;
            case "cross":
                this.cmd_cross(e);
                break;
            case "colors":
            case "white-black-blue":
            case "blue-yellow-white":
            case "yellow-black-blue":
            case "black-yellow-white":
            case "normal-colors":
                this.cmd_colors(e, cmd);
                break;
            case "text":
                this.cmd_text(e);
                break;
            case "read":
                this.cmd_read(e);
                break;
            case "readon":
                this.cmd_readon(e);
                break;
            case "read":
                this.cmd_read(e);
                break;
            case "volumeplus":
                this.cmd_volumeplus(e);
                break;
            case "volumeminus":
                this.cmd_volumeminus(e);
                break;
        }

        this.toolFocus(e.currentTarget);
    },

    dblclick: function (e) {
        var cmd = jQuery(e.currentTarget).attr("cmd");
        switch (cmd) {
            case "zoomout":
            case "zoomin":
                this.vAZoom.ratio(1);
                break;
            case "fontplus":
            case "fontminus":
				var l=this.vAFont.length;

				for(var i=0;i<l;i++){
					this.vAFont[i].size("auto");
				}
                break;
        }
        this.toolFocus(e.currentTarget);
    },

    cmd_reset: function () {
        jQuery("#ribbon .bigtool, #ribbon .listitem").removeClass("selected");

        this.vAZoom.zoom = 1;
        //this.vAFont.fontSize = "";
        this.vAText.isText = false;
        //this.vAColor.color = "";
        jQuery(this.screen).css({ "background-color": "", "color": "" });
        this.vAScreen.hide();
        this.vACross.hide();
        //this.vAFocus.reset();
        this.adjust();
        this.initReader();
        this.frame.contentWindow.location.reload();

		var l=this.vAFont.length;

		for(var i=0;i<l;i++){
			this.vAFont[i].fontSize = "";
			this.vAColor[i].color = "";
			this.vAFocus[i].reset();
		}

    },

    cmd_back: function (e) {
        this.vAHistory.back();
    },

    cmd_forward: function (e) {
        this.vAHistory.forward();
    },

    cmd_refresh: function () {
        this.vAHistory.isRefresh = true;
        this.frame.contentWindow.location.reload();
    },

    cmd_screen: function (e) {
        var tool = jQuery(e.currentTarget);
        if (tool.hasClass("selected")) {
            tool.removeClass("selected").removeClass("active");
            this.vAScreen.hide();
        }
        else {
            tool.addClass("selected");
            this.vAScreen.show();
        }

        this.adjust();
    },

    cmd_zoomout: function (e) {
        if (this.vAZoom.zoomOut()) {
            this.enable(jQuery(".bigtool[cmd=zoomin]")[0]);
        }
        else {
            this.disable(e.currentTarget);
        }
    },

    cmd_zoomin: function (e) {
        if (this.vAZoom.zoomIn()) {
            this.enable(jQuery(".bigtool[cmd=zoomout]")[0]);
        }
        else {
            this.disable(e.currentTarget);
        }
    },

    cmd_fontplus: function (e) {
		var l=this.vAFont.length,
			tag=true;

		for(var i=0;i<l;i++){
			tag=this.vAFont[i].fontPlus()&&tag
		}

        if (tag) {
            this.enable(jQuery(".bigtool[cmd=fontminus]")[0]);
        }
        else {
            this.disable(e.currentTarget);
        }
    },

    cmd_fontminus: function (e) {
		var l=this.vAFont.length,
			tag=true;

		for(var i=0;i<l;i++){
			tag=this.vAFont[i].fontMinus()&&tag
		}

        if (tag) {
            this.enable(jQuery(".bigtool[cmd=fontplus]")[0]);
        }
        else {
            this.disable(e.currentTarget);
        }
    },

    cmd_cross: function (e) {
        var tool = jQuery(e.currentTarget);
        if (tool.hasClass("selected")) {
            tool.removeClass("selected").removeClass("active");
            this.vACross.hide();
        }
        else {
            tool.addClass("selected");
            this.vACross.show();
        }
    },

    cmd_colors: function (e, cmd) {
        e.stopPropagation();
        var tool = jQuery(e.currentTarget);

        if (cmd == "colors") {
            var list = jQuery(".dropdownlist", e.currentTarget);

            if (tool.hasClass("selected")) {
                list.hide();
                tool.removeClass("selected").removeClass("active");
            }
            else {
                list.css({ top: "80px", left: "566px" }).show();
                tool.addClass("selected");
            }
        }
        else {
            jQuery(tool[0].parentNode).hide();
            jQuery(tool[0].parentNode.parentNode).removeClass("selected").removeClass("active");
            jQuery(".listitem", tool[0].parentNode).removeClass("selected");

            switch (cmd) {
                case "white-black-blue":
                    jQuery(this.screen).css({ "background-color": "White", "color": "Black" });
					var l=this.vAColor.length;

					for(var i=0;i<l;i++){
						 this.vAColor[i].paint("Black", "Blue", "White");
						 this.vAFocus[i].paint("Black", "Blue", "White");
					}
                   
                    //this.vAFocus.paint("Black", "Blue", "White");
                    break;
                case "blue-yellow-white":
                    jQuery(this.screen).css({ "background-color": "Blue", "color": "Yellow" });
					var l=this.vAColor.length;

					for(var i=0;i<l;i++){
						 this.vAColor[i].paint("Yellow", "White", "Blue");
						 this.vAFocus[i].paint("Yellow", "White", "Blue");
					}
                    //this.vAColor.paint("Yellow", "White", "Blue");
                    //this.vAFocus.paint("Yellow", "White", "Blue");
                    break;
                case "yellow-black-blue":
                    jQuery(this.screen).css({ "background-color": "Yellow", "color": "Black" });
					var l=this.vAColor.length;

					for(var i=0;i<l;i++){
						 this.vAColor[i].paint("Black", "Blue", "Yellow");
						 this.vAFocus[i].paint("Black", "Blue", "Yellow");
						 //console.log(this.vAFocus[i].color+this.vAFocus[i].linkColor+this.vAFocus[i].bgColor);
					}
                    //this.vAColor.paint("Black", "Blue", "Yellow");
                    //this.vAFocus.paint("Black", "Blue", "Yellow");
                    break;
                case "black-yellow-white":
                    jQuery(this.screen).css({ "background-color": "Black", "color": "Yellow" });
					var l=this.vAColor.length;

					for(var i=0;i<l;i++){
						 this.vAColor[i].paint("Yellow", "White", "Black");
						 this.vAFocus[i].paint("Yellow", "White", "Black");
					}
                    //this.vAColor.paint("Yellow", "White", "Black");
                    //this.vAFocus.paint("Yellow", "White", "Black");
                    break;
                default:
                    jQuery(this.screen).css({ "background-color": "", "color": "" });
					var l=this.vAColor.length;

					for(var i=0;i<l;i++){
						 this.vAColor[i].reset();
						 this.vAFocus[i].reset();
					}
                    //this.vAColor.reset();
                    //this.vAFocus.reset();
                    return;
            }

            tool.addClass("selected");
        }
    },

    cmd_text: function (e) {
        var tool = jQuery(e.currentTarget);
        if (tool.hasClass("selected")) {
            tool.removeClass("selected").removeClass("active");
            this.vAText.reset();
        }
        else {
            tool.addClass("selected");
            this.vAText.text();
        }
    },

    cmd_read: function (e) {
        var tool = jQuery(e.currentTarget);
        if (tool.hasClass("selected")) {
            tool.removeClass("selected").removeClass("active");
            this.canRead = false;
            if (this.canReadon) {
                this.canReadon = false;
                jQuery(".bigtool[cmd=readon]").removeClass("selected").removeClass("active");
            }
            this.disable(jQuery(".bigtool[cmd=readon]")[0]);
        }
        else {
            tool.addClass("selected");
            this.canRead = true;
            this.enable(jQuery(".bigtool[cmd=readon]")[0]);
        }
    },

    cmd_readon: function (e) {
        if (this.canRead) {
            var tool = jQuery(e.currentTarget);
            if (tool.hasClass("selected")) {
                tool.removeClass("selected").removeClass("active");
                this.canReadon = false;
				var l=this.vAColor.length;

					for(var i=0;i<l;i++){
						 this.vAFocus[i].clearFocusNext();
					}
                
            }
            else {
                tool.addClass("selected");
                this.canReadon = true;
            }
        }
    },

    cmd_volumeplus: function (e) {
        this.reader.volumePlus();
        if (this.reader.canVolumePlus()) {
            this.enable(jQuery(".bigtool[cmd=volumeminus]")[0]);
        }
        else {
            this.disable(e.currentTarget);
        }
    },

    cmd_volumeminus: function (e) {
        this.reader.volumeMinus();
        if (this.reader.canVolumeMinus()) {
            this.enable(jQuery(".bigtool[cmd=volumeplus]")[0]);
        }
        else {
            this.disable(e.currentTarget);
        }
    },

    disable: function (tool) {
        tool = jQuery(tool);
        if (!tool.hasClass("disabled")) {
            var cmd = tool.attr("cmd");
            tool
            .unbind("mouseenter", this.mouseenter)
            .unbind("mouseleave", this.mouseleave)
            .unbind("click", this.click)
            .unbind("dblclick", this.dblclick)
            .removeClass("selected")
            .removeClass("active")
            .addClass("disabled")
            .find("img")
            .each(function (i) {
                jQuery(this).attr("src", jQuery(this).attr("src").replace(cmd + ".", cmd + "_disabled."));
            });
        }
    },

    enable: function (tool) {
        tool = jQuery(tool);
        if (tool.hasClass("disabled")) {
            var cmd = tool.attr("cmd");
            tool
            .bind("mouseenter", this.mouseenter)
            .bind("mouseleave", this.mouseleave)
            .bind("click", this.click)
            .bind("dblclick", this.dblclick)
            .removeClass("disabled")
            .find("img").each(function (i) {
                jQuery(this).attr("src", jQuery(this).attr("src").replace(cmd + "_disabled.", cmd + "."));
            });
        }
    },

    adjust: function () {
        var h;
        if (window.innerHeight) {
            h = window.innerHeight;
        }
        else if (document.documentElement.clientHeight) {
            h = document.documentElement.clientHeight;
        }
        else {
            h = document.body.clientHeight;
        }

        if (jQuery(".bigtool[cmd=screen]").hasClass("selected")) {
            jQuery(this.frame).css("height", h - 102 - 80);
        }
        else {
            jQuery(this.frame).css("height", h - 102);
        }
    },

    historyChanged: function () {
        if (this.vAHistory.canBack()) {
            this.enable(jQuery(".bigtool[cmd=back]")[0]);
        }
        else {
            this.disable(jQuery(".bigtool[cmd=back]")[0]);
        }

        if (this.vAHistory.canForward()) {
            this.enable(jQuery(".bigtool[cmd=forward]")[0]);
        }
        else {
            this.disable(jQuery(".bigtool[cmd=forward]")[0]);
        }
    },

    focusChanged: function (text) {
        if (typeof text!='string') {
            text = this.vAFocus[0].getText();
        }
        if (text.length > 0) {
            if (this.canRead) {
                this.readerFocus(text,this.vAFocus[0]);
            }
            else {
                if (this.vAScreen.isShow) {
                    this.screenFocus(text);
                }
            }
        }
        else {
            if (this.canReadon) {
                this.vAFocus[0].focusNext();
            }
        }
    },

    screenFocus: function (text,vAFocus) {
        var strs = this.split(text, 30);
        var i = 0;
        clearTimeout(this.vAScreen.timer);

        var action = jQuery.proxy(function () {
            clearTimeout(this.vAScreen.timer);

            if (i < strs.length) {
                this.vAScreen.showText(strs[i]);
                this.vAScreen.timer = setTimeout(action, strs[i].length * 200);
            }
            i++;

            if (i == strs.length + 1) {
                if (this.canReadon) {
                    vAFocus.focusNext();
                }
                return;
            }
        }, this);

        action();
    },

    readerFocus: function (text,vAFocus) {
        var strs = this.split(text, 30),
			arg=!!arguments[2];
        strs.i = 0;

        var action = jQuery.proxy(function () {
            if (strs.i < strs.length) {
                this.reader.stop();

                if (this.vAScreen.isShow) {
                    this.vAScreen.showText(strs[strs.i]);
                }

                if (this.reader.readable(strs[strs.i])) {
                    this.reader.finish = action;
                    this.reader.read(strs[strs.i]);
                }
                else {
                    strs.i++;
                    action();
                }
            }

            strs.i++;

            if ((strs.i == strs.length + 1)&&!arg) {
                if (this.canReadon) {
                    vAFocus.focusNext();
                }
                return;
            }
        }, this);

        action();
    },

    split: function (str, max) {
        var length = str.length;
        if (length < max) {
            return [str];
        }
        else {
            var result = [];
            var i = 0;
            var start = 0;
            var last = 0;

            while (i < length) {
                if (i - start == max - 1) {
                    if (last == 0) {
                        result.push(str.substring(start, start + max));
                        i = start + max;
                        start = i;
                        continue;
                    }
                    else {
                        result.push(str.substring(start, last + 1));
                        i = last + 1;
                        start = i;
                        last = 0;
                        continue;
                    }
                }
                if (this.isSeparator(str[i])) {
                    if (i > start) {
                        last = i;
                    }
                    else {
                        start = i + 1;
                    }
                }
                i++;
            }
            if (start < length) {
                result.push(str.substring(start))
            }
        }
        return result;
    },

    isSeparator: function (c) {
        switch (c) {
            case '，':
            case '。':
            case '！':
            case '？':
            case '；':
            case '“':
            case '”':
            case '：':
            case '、':
            case ',':
            case '.':
            case '!':
            case '?':
            case ';':
            case '"':
            case ':':
            case '\n':
            case '-':
            case ' ':
                return true;
            default:
                return false;
        }
    }
};
