var adResult = false;
var adhref = window.location.href;
if (adhref.indexOf('?') > 0) {
    var adparam = adhref.substring(adhref.indexOf('?'));
    if (adparam.toLowerCase().indexOf('type=ad') > 0) {
        adResult = true;
    }
}
if ($('#popupFromControl').length > 0) {
    var adfromcontrol = $.trim($('#popupFromControl').val()) + "";
    if (adfromcontrol.toLowerCase() == "industry") {
        adResult = false;
    }
}
//搜索下拉列表显示
function showList($this, e) {
    $this = $($this);
    $(".searsite").css("z-index", "1");
    $this.parent().css("z-index", "10");
    if ($this.parent().find('ul').css('display') == "block") {
        $this.parent().find('ul').attr('style', 'display:none;');
        cancelBubble(e);
    }
    else {
        if ($this.parent().parent().siblings('.com-search').length > 0) {
            $this.parent().parent().siblings('.com-search').each(function () {
                $(this).find('ul').hide();
            });
        }
        $this.siblings("ul").width($this.parent().width() - 1).show();

        cancelBubble(e);
    }
}

//搜索列表选择
function liSelected($this, e, type) {
    var $this = $($this);
    if (typeof ($this.attr("op")) == "undefined") {
        $this.attr("op", "");
    }
    if (typeof ($this.attr("logic")) == "undefined") {
        $this.attr("logic", "");
    }
    if (type == "base") {
        $(".searsite a:first").html($this.html());
        $("#searchField").val($this.data("realfield"));

        $("#searchField").attr('op', $this.attr("op"));

        $("#searchField").attr('logic', $this.attr("logic"));
        $this.parent().parent().hide();
    } else {
        $this.parent().parent().siblings("a").html($this.html()).attr("colname", $this.attr("colname")).attr('op', $this.attr("op")).attr('logic', $this.attr("logic"));
        $this.parent().parent().hide();
    }
    cancelBubble(e);
}

function Check(reg, str) {
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}


function getUrl() {
    var url = window.location.href;
    var newUrl = url.replace(/\/search(?:\?|\/)?.*/gi, '');
    return newUrl;
}


