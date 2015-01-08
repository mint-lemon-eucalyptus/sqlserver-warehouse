/* ng-pagination - v0.1.0 - 2013-03-15 */
"use strict";

var paginationTemplate;

paginationTemplate = '<div class="ng-ui-pagination pagination">\
  <ul>\
    <li ng-show="showPreviousPage" ng-click="setPage(currentPage - 1)" ng-class="{disabled: onFirstPage}">\
      <a>&laquo;</a>\
    </li>\
    <li ng-show="showFirstPage" ng-click="setPage(0)" ng-class="{active: onFirstPage}">\
      <a>&laquo; First</a>\
    </li>\
    <li ng-repeat="page in visiblePages" ng-click="setPage(page.index)" ng-class="{disabled: !page.clickable, active: page.active}">\
      <a>{{page.text}}</a>\
    </li>\
    <li ng-show="showLastPage" ng-click="setPage(maxPages)" ng-class="{active: onLastPage}">\
      <a>Last &raquo;</a>\
    </li>\
    <li ng-show="showNextPage" ng-click="setPage(currentPage + 1)" ng-class="{disabled: onLastPage}">\
      <a>&raquo;</a>\
    </li>\
  </ul>\
</div>\
';

angular.module("Pagination", []).value('version', '0.0.1').directive("pagination", function () {
        var defaults, directiveDefinitionObject;
        defaults = {
            padding: {
                left: 2,
                right: 2,
                center: 2
            },
            onFirstPage: true,
            onLastPage: true,
            showPreviousPage: true,
            showFirstPage: true,
            showLastPage: true,
            showNextPage: true,
            pageSize: -1,           //count of records on page (17)
            currentPage: 0,
            lastItemId: -1
        };
        directiveDefinitionObject = {
            restrict: "EA",
            scope: {
                size: "=",
                total: "=",
                page: "=",
                lastPage: "=",
                last: "="
            },
            replace: true,
            template: paginationTemplate,
            compile: function (element, attr, linker) {
                return function (scope, iterStartElement, attr) {
                    var calcLastPage, expression, isVisible, setter, update, use;
                    setter = lib.scopeSetter(scope, attr, defaults);
                    expression = attr.pagination || attr.paginationResource || attr.resource;
                    use = {
                        size: scope.size !== void 0,
                        page: scope.page !== void 0,
                        lastPage: scope.lastPage !== void 0
                    };
                    //   console.log('scope',scope)
                    calcLastPage = function () {
                        var lastPage;
                        lastPage = Math.ceil(scope.total / scope.pageSize);
                        scope.maxPages = lastPage - 1;
                               //console.log("calclastpage", lastPage, scope.pageSize)
                        //      console.log("calclastpage", scope.size, scope.page, scope.lastPage)
                    };
                    isVisible = function (index) {
//                        console.log('isvisible', index, scope.maxPages, scope.currentPage)
                        if (index === 0) {
                            return !scope.showFirstPage;
                        }
                        if (index === scope.maxPages) {
                            return !scope.showLastPage;
                        }
                        if (index <= scope.padding.left || index >= scope.maxPages - scope.padding.right || Math.abs(index - scope.currentPage) <= scope.padding.center) {
                            //         console.log('\tisvisible', index, scope.maxPages, scope.currentPage)
                            return true;
                        }
                        return false;
                    };
                    update = function () {
                        scope.pages = lib.range(scope.maxPages);
                        //[0...maxPages+1]
                        //    console.log("scope.pages", scope.pages, scope.maxPages);
                        scope.visiblePages = scope.pages.map(function (item) {
                            var index = item.i;
                            if (!isVisible(index)) {
                                if (index !== scope.maxPages && index > 1 && isVisible(index - 1)) {
                                    if (isVisible(index + 1)) {
                                        return index;
                                    } else {
                                        return null;
                                    }
                                }
                                return false;
                            }
                            //      console.log('iv vi', index)
                            return index;
                        }).filter(function (page) {
                                return page !== false;
                            }).map(function (element, index) {
                                if (typeof element !== "number") {
                                    return {
                                        index: null,
                                        text: String.fromCharCode(0x2026),
                                        clickable: false,
                                        active: false
                                    };
                                }
                                return {
                                    index: element,
                                    text: element + 1,
                                    clickable: true,
                                    active: scope.currentPage === element
                                };
                            });
                        if (use.page) {
                            return scope.page = scope.currentPage;
                        }
                    };
                    scope.setPage = function (index) {
                        //    console.log('setPage',index,scope.currentPage,scope.maxPages)
                        //console.log('setpage', scope.currentPage, scope.lastItemId)
                        scope.$parent.ask({
                            page: scope.currentPage,
                            size: scope.pageSize,
                            order: 'asc',
                            field: 'id',
                            type:'page'
                        });
                        if ((scope.currentPage === index) || (index === null)) {
                            return;
                        }
                        scope.currentPage = Math.max(0, Math.min(scope.maxPages, index)) || 0;
                        update();
                        scope.onFirstPage = scope.currentPage === 0;
                        return scope.onLastPage = scope.currentPage === scope.maxPages;
                    };
                    scope.$parent.$watch(expression, function (list) {
                        //  console.log('$watch', "data.list", list.length);
                        scope.listLength = 0;
                        if (list) {
                            //   scope.listLength = list.length || list;
                            var max = -1;
                            for (var i = 0; i < list.length; ++i) {
                                if (list[i].id > max) {
                                    max = list[i].id;
                                }
                            }
                            scope.lastItemId = max;
                        }
                        calcLastPage();
                        return update();
                    });
                    scope.$parent.$watch("pagination.total", function (total) {
                  //      console.log('$watch', "pagination.total", total, scope.listLength);
                        // scope.total = total
                        scope.listLength = total;
                        return update();
                    });
                    scope.$watch("showFirstPage", update);
                    scope.$watch("showLastPage", update);
                    scope.$watch("size", function (sz) {
                        //console.log("$watch size", sz)
                        scope.pageSize = scope.size;
                        return update();
                    });
                    scope.$watch("page", function (page) {
                        //console.log("$watch page", arguments)
                        return scope.setPage(page);
                    });
                    scope.currentPage = 0;
                    scope.pageSize = scope.size || scope.pageSize || defaults.pageSize;
                    if (use.size) {
                        scope.size = scope.pageSize;
                    }
                    scope.currentPage = scope.page || scope.currentPage || defaults.currentPage;
                    if (use.page) {
                        scope.page = scope.currentPage;
                    }
                    //scope.listLength = scope.$eval(expression);
                    //console.log("listLength ", scope.listLength)
                    scope.padding = defaults.padding;
                    scope.padding.left = parseInt(attr.paddingLeft, 10) || scope.padding.left;
                    scope.padding.right = parseInt(attr.paddingRight, 10) || scope.padding.right;
                    scope.padding.center = parseInt(attr.paddingCenter, 10) || scope.padding.center;
                    setter.boolean("showPreviousPage", "showPreviousPage", "disablePreviousPage");
                    setter.boolean("showFirstPage", "showFirstPage", "disableFirstPage");
                    setter.boolean("showLastPage", "showLastPage", "disableLastPage");
                    setter.boolean("showNextPage", "showNextPage", "disableNextPage");
                    return scope.setPage(parseInt(attr.currentPage || attr.startPage, 10) || defaults.currentPage);
                };
            }
        };
        return directiveDefinitionObject;
    });

"use strict";

var __slice = [].slice;

angular.module("Pagination").filter("pagination",function () {
    return function (input, page, size) {
     //   console.log('filter1', input.length)
        return input
    };
}).filter("pageSlice", function () {
        return function () {
            var args, input;
            input = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            return Array.prototype.slice.apply(input, args);
        };
    });

var extend, lib, range;

lib = {
    extend: extend = function (options, defaults) {
        var key;
        if (typeof defaults !== "object") {
            return options;
        }
        for (key in defaults) {
            options[key] = options[key] || defaults[key];
        }
        return options;
    },
    range: range = function (size) {
        var i, result;
        result = [];
        i = 0;
        while (i < size) {
            result[i] = {i: i, last: 0};
            i++;
        }
        return result;
    },
    scopeSetter: function (scope, attr, defaults) {
        var set;
        set = function (key, value) {
            return scope[key] = value;
        };
        return {
            boolean: function (key, enable, disable) {
                if (attr[disable] !== void 0) {
                    return set(key, false);
                }
                if (attr[enable] !== void 0) {
                    return set(key, true);
                }
                return set(key, defaults[key]);
            }
        };
    }
};
