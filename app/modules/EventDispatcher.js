System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EventDispatcher;
    return {
        setters:[],
        execute: function() {
            EventDispatcher = (function () {
                function EventDispatcher() {
                    this.handlers = [];
                }
                EventDispatcher.prototype.on = function (handler) {
                    this.handlers.push(handler);
                };
                EventDispatcher.prototype.off = function (handler) {
                    this.handlers = this.handlers.filter(function (h) { return h !== handler; });
                };
                EventDispatcher.prototype.trigger = function (data) {
                    this.handlers.slice(0).forEach(function (h) { return h(data); });
                };
                return EventDispatcher;
            }());
            exports_1("EventDispatcher", EventDispatcher);
        }
    }
});
//# sourceMappingURL=EventDispatcher.js.map