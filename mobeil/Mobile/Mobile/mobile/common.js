function displayMultiple(prefixUrl, multiple, suffix) {
    if (!multiple || multiple.length == 0) return '';

    var html = "";
    multiple = multiple.replace(/,|，/g, ';');
    var arr = multiple.split(';');
    var len = arr.length;

    for (var i = 0; i < len; i++) {
        var item = arr[i];
        if (!item || item.length == 0) continue;
        html += ';<a href="' + prefixUrl + encodeURIComponent(item) + '" target="_blank">' + item + '</a>';
    }

    if (html.length > 0) {
        return html.substring(1) + (suffix ? suffix : '');
    }

    return '';
}

function renderAuthor(author) {
    return displayMultiple('http://www.cnki.net/kcms/detail/search.aspx?dbcode=CJFQ&sfield=au&skey=', author, '<span class="blk"></span>');
}

function renderOrg(org) {
    return displayMultiple('http://www.cnki.net/KCMS/detail/search.aspx?dbcode=CJFQ&sfield=inst&skey=', org);
}

//跳转
function turnTo(link) {
    var words = $("#searchWords").val();
    if (typeof (words) == "undefined" || words.length <= 0) {
        window.location.href = link;
        return;
    }

    var newLink = link.replace(/\/index(\/)?/gi, '/search$1');
    newLink += '?col=' + $("#searchProp").val() + '&words=' + encodeURIComponent(words);
    window.location.href = newLink;
}

//返回顶端方法
$(window).scroll(function () {
    if ($(window).scrollTop() > 150) {
        $("#return-top").show();
        if ($("#topFixed").length > 0) {
            $("#topFixed").attr("style", "position:fixed;z-index:1000;top:0;left:0;right:0;margin:auto;");
        }
    } else {
        $("#return-top").hide();
        if ($("#topFixed").length > 0) {
            $("#topFixed").attr("style", "position:relative;z-index:999;");
        }
    }
});

//错误信息提示
function showMessage(message, type) {
    var html;
    if (type == "phone") {
        html = '<div class="popwrap"><div class="poptip">' + message + '</div></div>';
    }
    else {
        html = '<div class="popwrap"><div class="poptip"><a href="#" class="close" onclick="closeTip(this)">';
        html += ' <span class="disn"></span></a>' + message + '</div></div>';
    }
    $(".tip").html(html);
    if ($('.police_layout').length > 0) {
        if (window.innerWidth >= 972) {
            $('.popwrap').css('left', (window.innerWidth - 972) / 2 - 8 + 'px');
            $('.police_main').css('margin-top', '-30px');
        }
    }
    setTimeout(function () {
        $(".popwrap").remove();
        if ($('.police_layout').length > 0) {
            $('.police_main').css('margin-top', '0px');
        }
    }, 4000);
}

function closeTip(tag) {
    tag.parentNode.parentNode.remove();
    if ($('.police_layout').length > 0) {
        $('.police_main').css('margin-top', '0px');
    }
}

function deleteNaviText(type) {
    $(".crumb .sideL").html("");
    if (type == 'journalbaseinfo') {
        $("#multipleItems").val("");
    }
    else {
        $("#clsValue").val("");
    }
    if ($('#wheresql').length > 0) {
        $('#wheresql').val("");
    }
    searchSubmit();
}

//得到事件
function getEvent() {
    if (window.event) { return window.event; }
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent
               || arg0.constructor == KeyboardEvent)
               || (typeof (arg0) == "object" && arg0.preventDefault
               && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}

//阻止冒泡
function cancelBubble() {
    var e = getEvent();
    if (window.event) {
        //e.returnValue=false;//阻止自身行为
        e.cancelBubble = true;//阻止冒泡
    } else if (e.preventDefault) {
        //e.preventDefault();//阻止自身行为
        e.stopPropagation();//阻止冒泡
    }
}

//滚动
$.fn.extend({
    triggerOnView: function (options) {
        var settings = {
            debug: false,
            eventType: 'click',
            verticalRange: 0,
            horizontalRange: 0,
            singleShotOnly: true,
            callback: null,
            scrolling: null
        };
        return this.each(function () {
            var $this = $(this);
            if (options) {
                $.extend(settings, options);
            }
            var triggerOnView = function () {
                var offset = $this.offset();
                var $window = $(window);

                if ($.isFunction(settings.scrolling)) {
                    settings.scrolling($this, { top: $(window).scrollTop(), left: $(window).scrollLeft() });
                }

                var doTrigger = $window.scrollTop() + $window.height() >= offset.top + $this.height() + settings.verticalRange &&
                                $window.scrollTop() <= offset.top + settings.verticalRange &&
                                $window.scrollLeft() + $window.width() >= offset.left + $this.width() + settings.horizontalRange &&
                                $window.scrollLeft() <= offset.left + settings.horizontalRange;
                if (settings.debug) {
                    var $monitor = $('#monitor');
                    var debugContent = "<b>Offset top:</b> " + offset.top + "<br><b>ScrollTop:</b> " + $window.scrollTop() +
                        "<br><b>Offset left:</b> " + offset.left + "<br><b>ScrollLeft:</b> " + $window.scrollLeft() +
                        "<br><b>ScrollTop + Window:</b> " + ($window.scrollTop() + $window.height()) +
                        "<br><b>ScrollLeft + Window:</b> " + ($window.scrollLeft() + $window.width()) +
                        "<br><b>offset.top + $this.height:</b> " + (offset.top + $this.height() + settings.verticalRange) +
                        "<br><b>Will trigger:</b> " + doTrigger;
                    if ($monitor.length == 0) {
                        $(document.body).append("<div id='monitor' style='position: absolute; top: 10px; left: 10px; padding: 1em; color: white; background-color: black'>" + debugContent + "</div>");
                    } else {
                        $monitor.css("top", $window.scrollTop() + 10 + "px").html(debugContent);
                    }
                }
                if (doTrigger) {
                    var progress = true;
                    if ($.isFunction(settings.callback)) {
                        if (settings.callback($this, settings) === false) {
                            progress = false;
                        }
                    }
                    if (progress) {
                        $this.trigger(settings.eventType);
                        //it's one shot function, so unregister itself
                        if (settings.singleShotOnly) {
                            $window.unbind("scroll", arguments.callee);
                        }
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            };
            $(window).bind("scroll", triggerOnView);
        });
    }
});


//自动提示
function autosuggestion(request, response) {
    $.ajax({
        url: "http://api.cnki.net/search/suggestions/keywords?q=" + encodeURI(request.term),
        dataType: "jsonp",
        success: function (data) {
            data.length = 10;
            response($.map(data, function (item) {
                return item;
            }));
        }
    });
}

//排序
function sort(obj, sortValue) {
    $this = $(obj);//$("#relevancy");
    if (sortValue.length > 0) {
        $this = $("#" + sortValue);
    }
    $("#pageNum").val("1");
    $("#order a").removeClass("ordercur");
    $("#order a span").removeClass();
    if (sortValue.length > 0 && sortValue != "RELEVANT") {
        $this.siblings("a").children("span").attr("typeID", "0");
        if ($this.children("span").attr("typeID") < 1 || $this.children("span").attr("typeID") == "0") {
            $this.addClass("ordercur");
            $this.children("span").addClass("orderD");
            $this.children("span").attr("typeID", "1");
            //$this.siblings("a:first").attr("id", "relevancy");
            $("#sortName").val(sortValue);
            //$("#sortDirection").val("DESC");
            if (sortValue.toLowerCase() == "efficacygradecode") {
                $("#sortDirection").val("ASC");
            }
            else {
                $("#sortDirection").val("DESC");
            }
        }
        else if ($this.children("span").attr("typeID") == "1") {
            $this.addClass("ordercur");
            $this.children("span").addClass("orderU");
            $this.children("span").attr("typeID", "0");
            //$this.siblings("a:first").attr("id", "relevancy");
            $("#sortName").val(sortValue);
            //$("#sortDirection").val("ASC");
            if (sortValue.toLowerCase() == "efficacygradecode") {
                $("#sortDirection").val("DESC");
            }
            else {
                $("#sortDirection").val("ASC");
            }
        }
    } else {
        $this.siblings("a").children("span").attr("typeID", "0");
        $this.addClass("ordercur");
        $this.children("span").addClass("orderD");
        $("#sortName").val("RELEVANT");
        $("#sortDirection").val("DESC");
        //$("#order a:not(first)").children("span").attr("typeID", "0");
        //$("#order a:first").addClass("ordercur");
        //$("#order a:first span").addClass("orderD");
        //$("#sortName").val("");
        //$("#sortDirection").val("");
    }

    var json = getJson();
    search(json);
}