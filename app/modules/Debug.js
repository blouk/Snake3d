System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Debug;
    return {
        setters:[],
        execute: function() {
            Debug = (function () {
                function Debug() {
                }
                Debug.prototype.constuctor = function () {
                    var _this = this;
                    $(document).ready(function () {
                        _this.canvas = $('canvas')[0];
                        _this.context = _this.canvas.getContext('2d');
                        console.log(_this.context);
                    });
                };
                Debug.prototype.log = function () {
                    //this.ctx.fillText(this.snake_array[0].position, 5, window.innerHeight - 5);
                };
                return Debug;
            }());
            exports_1("Debug", Debug);
        }
    }
});
//# sourceMappingURL=Debug.js.map