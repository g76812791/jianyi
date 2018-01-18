Host = {
    //jPlayer Flash Path
    playerPath: "js/",

    ttsServer: "",

    // Domain
    domain: "www.hebei.gov.cn",
    mp3Path: ""
};

Host.getCurrent = function (w) {
    var h = {};
    h.window = w ? w : window;
    var url = h.window.document.location.href;
    //Host.mp3Path = Host.ttsServer + hex_md5(url) + "/";
    return Host;
}
