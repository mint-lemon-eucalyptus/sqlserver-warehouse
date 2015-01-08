'use strict';
var myApp = angular.module('myApp.directives', []);

myApp.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}]);
/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
myApp
    .value('uiTinymceConfig', {
        plugins: [
            "advlist autolink link image lists charmap preview hr anchor pagebreak",
            "wordcount visualblocks visualchars code fullscreen insertdatetime nonbreaking",
            "table textcolor sql cypher"
        ],
        toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | formatselect fontselect fontsizeselect",
        toolbar2: "bullist numlist | outdent indent blockquote | link unlink anchor image media | inserttime preview | forecolor backcolor | code sql cypher",
        toolbar3: "table | hr reeditformat | subscript superscript | charmap | fullscreen | visualchars visualblocks nonbreaking pagebreak",
        menubar: false,
        height: 800,
        theme_advanced_resizing: true,
        theme_advanced_resizing_min_height: 2000,
        toolbar_items_size: 'small',
        valid_elements: '*[*]',
        extended_valid_elements: 'script[language|type|src] a[href|target|class]',
        file_browser_callback: function (field_name, url, type, win) {
            if (type == 'image') {
                $('#my_form input').click();
                console.log('file_browser_callback');
            }
        }
    })
    .directive('uiTinymce', ['uiTinymceConfig', function (uiTinymceConfig) {
        uiTinymceConfig = uiTinymceConfig || {};
        var generatedIds = 0;
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elm, attrs, ngModel) {
                var expression, options, tinyInstance;
                // generate an ID if not present
                //console.log(attrs)
                if (!attrs.id) {
                    attrs.$set('id', 'uiTinymce' + generatedIds++);
                } else {
                    return
                }
                options = {
                    // Update model when calling setContent (such as from the source editor popup)
                    setup: function (ed) {
                        ed.on('init', function (args) {
                            ngModel.$render();
                        });
                        // Update model on button click
                        ed.on('ExecCommand', function (e) {
                            ed.save();
                            ngModel.$setViewValue(elm.val());
                            if (!scope.$$phase) {
                                scope.$apply();
                            }
                        });
                        // Update model on keypress
                        ed.on('KeyUp', function (e) {
                            console.log(ed.isDirty());
                            ed.save();
                            ngModel.$setViewValue(elm.val());
                            if (!scope.$$phase) {
                                scope.$apply();
                            }
                        });
                        ed.on('change', function (e) {
                            ed.save();
                            ngModel.$setViewValue(elm.val());
                            if (!scope.$$phase) {
                                scope.$apply();
                            }
                        });
                    },
                    mode: 'specific_textareas',
                    selector: "#" + attrs.id,
                    elements: attrs.id
                };
                if (attrs.uiTinymce) {
                    expression = scope.$eval(attrs.uiTinymce);
                } else {
                    expression = {};
                }
                angular.extend(options, uiTinymceConfig, expression);
                setTimeout(function () {
                    tinymce.init(options);
                }, 30);


                ngModel.$render = function () {
                    if (!tinyInstance) {
                        tinyInstance = tinymce.get(attrs.id);
                    }
                    //   console.log("tinyInstance", attrs.id)
                    if (tinyInstance) {
                        //     console.log("tinyInstance setting")
                        tinyInstance.setContent(ngModel.$viewValue || '');
                    }
                };
            }
        };
    }])

.directive("anPrivacy", function () {
    return function (scope, element, iAttrs) {
        var privacies = {
            0: "show for all",
            2: "authorized only",
            100: "admins only"
        };
        iAttrs.$observe('privacy', function (value) {
            element.html(privacies[value]);
        });
    }
})


