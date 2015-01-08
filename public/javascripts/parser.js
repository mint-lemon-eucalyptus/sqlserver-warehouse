var Parser = function () {


        var parser = this;
        var popoverSelector = "#dtcreated";
        var popoverContent = "", popoverTitle = "", popoverTimeout;
        var container = null, lang = null, type = null, driver;
        this.queriesCounter = 0;
        this.init = function (arg) {
            container = arg.container;
            type = arg.type;
            driver = arg.driver,
                lang = arg.lang;
            $(popoverSelector).popover({
                animation: true,
                trigger: 'manual',
                title: function () {
                    return popoverTitle;
                },
                delay: { show: 300, hide: 1100 },
                placement: 'bottom',
                content: function () {
                    return popoverContent;
                }
            });
        }

        function showPopover(title, content) {
            popoverContent = content;
            popoverTitle = title;
            $(popoverSelector).popover('show');
            clearTimeout(popoverTimeout);
            popoverTimeout = setTimeout(function () {
                $(popoverSelector).popover('hide');
            }, 4000);
            $('.popover').click(function () {
                $(popoverSelector).popover('hide');
                clearTimeout(popoverTimeout);
                $(this).unbind('click')
            });
        }


        this.fromJson = function (json) {
            ++this.queriesCounter;
            console.log(json)
            var srs = json.results[0];
            var urs = json.results[1];
            var content, title, head;
            content = json.alert;
            title = json.header;
            var div = $('<div class="row-fluid"></div>')
                .append(($('<h5></h5>').html(head)));
            var rsDiv = $('<div class="row-fluid"></div>')
                .append($('<div class="span6"></div>')
                    .append($('<p>Правильный запрос:</p>'))
                    .append(parseResults(srs)));
            if (urs) {
                rsDiv.append($('<div class="span6"></div>')
                    .append($('<p>Ваш запрос:</p>'))
                    .append(parseResults(urs)));
            } else {
                rsDiv.append($('<div class="span6"></div>')
                    .append($('<p>Ваш запрос вернул ошибку</p>')))
            }
            div.append(rsDiv);
            container.find('div.collapse:first').prepend(__body(div));
            container.find('div.collapse:first').prepend(__header(json.query.replace(/\n/g, '<br>'), json.queryTime));
//        console.log(srs, urs)
            console.log(title, content)
            showPopover(title, content);
        }


        /*
         container.find('div.collapse:first').prepend(__body(table));
         container.find('div.collapse:first').prepend(__header(resj.query, resj.time));
         */
        function parseResults(res) {
            console.log(res)
            if (type == 'text') {
                container.val(JSON.stringify(res, null, 4));
            } else {
                if (type == 'table') {
                    var thead = $('<thead></thead>').append('<th>#</th>');
                    for (var i in res[0]) {
                        thead.append('<th>' + i + '</th>')
                    }
                    var tbody = $('<tbody></tbody>');
                    for (var i = 0; i < res.length; ++i) {
                        var tr = $('<tr></tr>').append($('<td>' + (i + 1) + '</td>'));
                        console.log("Object.keys",Object.keys(res[i]))
                        if (Object.keys(res[i]).length > 0) {
                            for (var j in res[i]) {
                                tr.append($('<td></td>').append(parseNode(res[i][j])));
                            }
                        } else {
                            tr.append($('<td></td>').append("NULL"));
                        }
                        tbody.append(tr);
                    }
                    var table = $('<div class="panel-body"></div>')
                        .append($('<div id="inner' + parser.queriesCounter + '" class="panel-collapse collapse in">')
                            .append($('<table class="table table-bordered table-hover">')
                                .append(thead)
                                .append(tbody)));
                    return table;
                } else {

                }
            }
        }

        function __header(query, time) {
            return $('<div class="panel-heading">')
                .append('<hr>')
                .append($('<h5 class="panel-title">')
                    .append($('<a data-toggle="collapse" data-parent="' + container.selector + '"href="#inner' + parser.queriesCounter + '"></a>')
                        .append($('<div class="row-fluid">')
                            .append('<div class="cypher_span span2">' + driver + ':</div>')
                            .append('<div class="span8">' + query.replace(/\n/g, ' ') + '</div>')
                            .append('<div class="time_span span2">' + time + ' ms' + '</div>'))));
        }

        function __body(res, code) {
            return $('<div class="panel-body">')
                .append($('<div id="inner' + parser.queriesCounter + '" class="accordion-body panel-collapse collapse in">')
                    .append($('<div>')
                        .append(res)
                        .append((code ? '<br>код: ' + code : '')))
                );
        }

        function parseNode(j) {
            return $('<div>' + JSON.stringify(j, null, 4) + '</div>');
        }
    }
    ;

Parser.Utils = Parser.Utils || {};

