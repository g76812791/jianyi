EasyReader = function(args, finish) {
    this.finish = finish;
    this.args = args;
    this.init = jQuery.proxy(this.init, this);
    this.isEnable = jQuery.proxy(this.isEnable, this);
    this.readable = jQuery.proxy(this.readable, this);
    this.read = jQuery.proxy(this.read, this);
    this.pause = jQuery.proxy(this.pause, this);
    this.resume = jQuery.proxy(this.resume, this);
    this.stop = jQuery.proxy(this.stop, this);
    this.volumePlus = jQuery.proxy(this.volumePlus, this);
    this.volumeMinus = jQuery.proxy(this.volumeMinus, this);
    this.volume = jQuery.proxy(this.volume, this);
    this.canVolumePlus = jQuery.proxy(this.canVolumePlus, this);
    this.canVolumeMinus = jQuery.proxy(this.canVolumeMinus, this);
    this.ratePlus = jQuery.proxy(this.ratePlus, this);
    this.rateMinus = jQuery.proxy(this.rateMinus, this);
    this.rate = jQuery.proxy(this.rate, this);
    this.canRatePlus = jQuery.proxy(this.canRatePlus, this);
    this.canRateMinus = jQuery.proxy(this.canRateMinus, this);
    this.onFinish = jQuery.proxy(this.onFinish, this);

    this.init();
}

EasyReader.readableExp = new RegExp("[a-zA-Z0-9\u4E00-\u9FA5\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A]");

EasyReader.readable = function (text) {
    return EasyReader.readableExp.test(text);
}

EasyReader.prototype = {
    init: function() {
        try {
            this._reader = new EasyReader.MSTTS(this.args, this.onFinish);
        }
        catch (e) {
            this._reader = new EasyReader.ServerTTS(this.args, this.onFinish);
        }
    },

    isEnable: function() {
        return !!this._reader;
    },

    readable: function(text) {
        return EasyReader.readableExp.test(text);
    },

    read: function(text) {
        text += "";
        if (this._reader && text && EasyReader.readableExp.test(text)) {
            this._reader.read(text);
        }
    },

    pause: function() {
        if (this._reader) {
            this._reader.pause();
        }
    },

    resume: function() {
        if (this._reader) {
            this._reader.resume();
        }
    },

    stop: function() {
        if (this._reader) {
            this._reader.stop();
        }
    },

    volumePlus: function() {
        if (this._reader) {
            this._reader.volumePlus();
        }
    },

    volumeMinus: function() {
        if (this._reader) {
            this._reader.volumeMinus();
        }
    },

    volume: function(v) {
        if (this._reader) {
            return this._reader.volume(v);
        }
    },

    canVolumePlus: function() {
        if (this._reader) {
            return this._reader.canVolumePlus();
        }
        else {
            return false;
        }
    },

    canVolumeMinus: function() {
        if (this._reader) {
            return this._reader.canVolumeMinus();
        }
        else {
            return false;
        }
    },

    ratePlus: function() {
        if (this._reader) {
            this._reader.ratePlus();
        }
    },

    rateMinus: function() {
        if (this._reader) {
            this._reader.rateMinus();
        }
    },

    rate: function(v) {
        if (this._reader) {
            return this._reader.rate(v);
        }
    },

    canRatePlus: function() {
        if (this._reader) {
            return this._reader.canRatePlus();
        }
        else {
            return false;
        }
    },

    canRateMinus: function() {
        if (this._reader) {
            return this._reader.canRateMinus();
        }
        else {
            return false;
        }
    },

    onFinish: function() {
        if (jQuery.isFunction(this.finish)) {
            this.finish();
        }
    }
}

EasyReader.MSTTS = function(args, finish) {
    this._args = args;
    this._finish = finish;
    this._timer = null;
    this.init = jQuery.proxy(this.init, this);
    this.read = jQuery.proxy(this.read, this);
    this.pause = jQuery.proxy(this.pause, this);
    this.resume = jQuery.proxy(this.resume, this);
    this.stop = jQuery.proxy(this.stop, this);
    this.volumePlus = jQuery.proxy(this.volumePlus, this);
    this.volumeMinus = jQuery.proxy(this.volumeMinus, this);
    this.volume = jQuery.proxy(this.volume, this);
    this.canVolumePlus = jQuery.proxy(this.canVolumePlus, this);
    this.canVolumeMinus = jQuery.proxy(this.canVolumeMinus, this);
    this.ratePlus = jQuery.proxy(this.ratePlus, this);
    this.rateMinus = jQuery.proxy(this.rateMinus, this);
    this.rate = jQuery.proxy(this.rate, this);
    this.canRatePlus = jQuery.proxy(this.canRatePlus, this);
    this.canRateMinus = jQuery.proxy(this.canRateMinus, this);
    this.checkState = jQuery.proxy(this.checkState, this);
    this.init();
}

EasyReader.MSTTS.prototype = {
    init: function () {
        this._reader = new ActiveXObject("Sapi.SpVoice");
        this._reader.Voice = this._reader.GetVoices("Name = Microsoft Lili").Item(0);

        if (this._args && this._args.speed && this._args.speed == "slow") {
            this.rate(-3);
        }
    },

    checkState: function () {
        clearTimeout(this._timer);

        if (this._reader.Status.RunningState == 2) {
            this._timer = setTimeout(this.checkState, 200);
        }
        else {
            clearTimeout(this._timer);
            this._finish();
        }
    },

    read: function (text) {
        this._reader.Speak(text, 1);
        this._timer = setTimeout(this.checkState, 200);
    },

    pause: function () {
        this._reader.Pause();
    },

    resume: function () {
        this._reader.Resume();
    },

    stop: function () {
        clearTimeout(this._timer);
        this._reader.Speak("", 2);
    },

    volumePlus: function () {
        if (this._reader.Volume >= 100) {
            this._reader.Volume = 100;
        }
        else {
            this._reader.Volume += 20;
        }
    },

    volumeMinus: function () {
        if (this._reader.Volume <= 0) {
            this._reader.Volume = 0;
        }
        else {
            this._reader.Volume -= 20;
        }
    },

    volume: function (v) {
        if (v) {
            if (v > 1) { v = 1 }
            if (v < 0) { v = 0 }
            this._reader.Volume = v * 100;
        }
        else {
            return this._reader.Volume / 100;
        }
    },

    canVolumePlus: function () {
        return this._reader.Volume < 100;
    },

    canVolumeMinus: function () {
        return this._reader.Volume > 0;
    },

    ratePlus: function () {
        if (this._reader.Rate >= 10) {
            this._reader.Rate = 10;
        }
        else {
            this._reader.Rate += 1;
        }
    },

    rateMinus: function () {
        if (this._reader.Rate <= -10) {
            this._reader.Rate = -10;
        }
        else {
            this._reader.Rate -= 1;
        }
    },

    rate: function (v) {
        if (v) {
            if (v > 10) { v = 10 }
            if (v < -10) { v = -10 }
            this._reader.Rate = v;
        }
        else {
            return this._reader.Rate;
        }
    },

    canRatePlus: function () {
        return this._reader.Rate < 10;
    },

    canRateMinus: function () {
        return this._reader.Rate > -10;
    }
}




EasyReader.ServerTTS = function(args, finish) {
    this._args = args;
    this._finish = finish;
    this.readerVolume = 1;

    this.init = jQuery.proxy(this.init, this);
    this.read = jQuery.proxy(this.read, this);
    this.pause = jQuery.proxy(this.pause, this);
    this.resume = jQuery.proxy(this.resume, this);
    this.stop = jQuery.proxy(this.stop, this);
    this.volumePlus = jQuery.proxy(this.volumePlus, this);
    this.volumeMinus = jQuery.proxy(this.volumeMinus, this);
    this.volume = jQuery.proxy(this.volume, this);
    this.canVolumePlus = jQuery.proxy(this.canVolumePlus, this);
    this.canVolumeMinus = jQuery.proxy(this.canVolumeMinus, this);
    this.ratePlus = jQuery.proxy(this.ratePlus, this);
    this.rateMinus = jQuery.proxy(this.rateMinus, this);
    this.rate = jQuery.proxy(this.rate, this);
    this.canRatePlus = jQuery.proxy(this.canRatePlus, this);
    this.canRateMinus = jQuery.proxy(this.canRateMinus, this);
    this.onFinish = jQuery.proxy(this.onFinish, this);
    this.onError = jQuery.proxy(this.onError, this);
    this.init();
}

EasyReader.ServerTTS.prototype = {
    init: function() {
        this.player = jQuery("<div id='jquery_jplayer'></div>");
        jQuery(document.body).append(this.player);

        this.player.jPlayer({
            swfPath: this._args && this._args.playerPath ? this._args.playerPath : "/js/",
            supplied: "mp3",
            wmode: "window",
            volume: this.readerVolume
        })

        this.player.bind(jQuery.jPlayer.event.ended, this.onFinish);
        this.player.bind(jQuery.jPlayer.event.error, this.onError);
    },

    onFinish: function() {
        if (jQuery.isFunction(this._finish)) {
            this._finish();
        }
    },

    onError: function() {
        if (this.mp3) {
            try {
                this.player.jPlayer("setMedia", { mp3: this.mp3 + "&time=" + new Date().getTime() }).jPlayer("play");
                this.mp3 = "";
            }
            catch (e) { }
        }
    },

    read: function(text) {
        var md5 = jQuery.md5.hex_md5(text);
        //this.mp3 = ((this._args && this._args.mp3Path) ? this._args.mp3Path : "/tts/host/") + md5 + ".tts.mp3?text=" + encodeURIComponent(text);
        //this.mp3 = "http://218.12.44.24/cgi-bin/index.pl?voice=female&cache=1&rate=1&text=" + encodeURIComponent(text);
		//this.mp3 = "http://192.168.0.184/perl/ekho_agent.pl?cache=1&mtts=1&text=" + encodeURIComponent(text);
        this.mp3 = "http://tsn.baidu.com/text2audio?tex=" + encodeURIComponent(text) + "&lan=zh&cuid=123qwe&ctp=1&tok=" + "24.95370a49e87bc322c8153a574c1a7e85.2592000.1518764495.282335-7883556";

        try {
            this.player.jPlayer("setMedia", { mp3: this.mp3 }).jPlayer("play");
        }
        catch (e) { }
    },

    pause: function() {
        this.player.jPlayer("pause");
    },

    resume: function() {
        this.player.jPlayer("play");
    },

    stop: function() {
        try {
            this.player.jPlayer("stop");
        }
        catch (e) { }
    },

    volumePlus: function() {
        this.readerVolume += 0.1;

        if (this.readerVolume >= 0.99) {
            this.readerVolume = 1;
        }

        this.player.jPlayer("volume", this.readerVolume);
    },

    volumeMinus: function() {
        this.readerVolume -= 0.1;

        if (this.readerVolume <= 0.01) {
            this.readerVolume = 0;
        }

        this.player.jPlayer("volume", this.readerVolume);
    },

    volume: function(v) {
        if (v) {
            if (v > 1) { v = 1 }
            if (v < 0) { v = 0 }
            this.player.jPlayer("volume", v);
        }
        else {
            return this.readerVolume;
        }
    },

    canVolumePlus: function() {
        return this.readerVolume < 1;
    },

    canVolumeMinus: function() {
        return this.readerVolume > 0;
    },

    ratePlus: function() {

    },

    rateMinus: function() {

    },

    rate: function(v) {

    },

    canRatePlus: function() {
        return false;
    },

    canRateMinus: function() {
        return false;
    }
}
