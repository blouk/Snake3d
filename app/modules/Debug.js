System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Debug;
    return {
        setters:[],
        execute: function() {
            Debug = (function () {
                function Debug() {
                    $('body').append('<div id="debug"></div>');
                    this.debugg = $('#debug');
                }
                Debug.prototype.log = function (message) {
                    this.debugg.html(message);
                };
                return Debug;
            }());
            exports_1("Debug", Debug);
        }
    }
});
//# sourceMappingURL=Debug.js.map