//依赖于jquery Ajax
//查询js
; (function ($) {
    //查询实体
    var queryModel = function () {
        this.items = 0;
        var index = 0;
        var betweens = [];
        var data = [{ Logic: "AND", Items: [] }];

        this.newGroup = function (logic) {
            var group = { Logic: logic, Items: [] };
            data.push(group);
            index++;
        };

        this.newItem = function (name, value, operate, logic) {
            if (!name || name.length == 0 || !value || value.length == 0)
                return;

            if (!logic) logic = "AND";
            if (!operate) operate = "=";

            this.items++;
            var item = { Name: name, Value: value, Operate: operate, Logic: logic };
            data[index].Items.push(item);
        };

        this.newBetweenItem = function (name, min, max, logic) {
            if (!name || (!min && !max))
                return;

            this.items++;
            if (!logic) logic = 'AND';
            var item = { Name: name, Min: min, Max: max, Logic: logic };
            betweens.push(item);
        };

        this.toJson = function () {
            var dataJson = dataToJson();
            var betweenJson = betweenToJson();

            return $.extend(dataJson, betweenJson);
        };

        function dataToJson() {
            var k = 0;
            var json = {};
            for (var i = 0; i <= index; i++) {
                var len = data[i].Items.length;
                if (len <= 0) continue;

                var key = 'Groups[' + k + '].Logic';
                var value = data[i].Logic;
                json[key] = value;

                for (var j = 0; j < len; j++) {
                    var keyPre = 'Groups[' + k + '].Items[' + j + '].';
                    json[keyPre + 'Name'] = data[i].Items[j].Name;
                    json[keyPre + 'Value'] = data[i].Items[j].Value;
                    json[keyPre + 'Logic'] = data[i].Items[j].Logic;
                    json[keyPre + 'Operate'] = data[i].Items[j].Operate;
                }
                k++;
            }
            return json;
        }

        function betweenToJson() {
            var json = {};
            var m = betweens.length;
            if (m == 0) return json;

            for (var i = 0; i < m; i++) {
                var keyPre = 'BetweenItems[' + i + '].';
                json[keyPre + 'Min'] = betweens[i].Min;
                json[keyPre + 'Max'] = betweens[i].Max;
                json[keyPre + 'Name'] = betweens[i].Name;
                json[keyPre + 'Logic'] = betweens[i].Logic;
            }

            return json;
        }
    };
    window.queryModel = queryModel;

    var cord = {};
    window.Cord = cord;
    //查询方法
    cord.search = function (url, json, beforeSendcb, completecb, successcb, errorcb) {
        $.ajax({
            url: url,
            type: "POST",
            data: json,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                beforeSendcb();
            },
            complete: function () {
                completecb();
            },
            success: function (data) {
                successcb(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorcb(XMLHttpRequest, textStatus, errorThrown);
            }
        });
    };
})(jQuery);



