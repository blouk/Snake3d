System.register(['./EventDispatcher'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EventDispatcher_1;
    var Key, KeyEvent;
    return {
        setters:[
            function (EventDispatcher_1_1) {
                EventDispatcher_1 = EventDispatcher_1_1;
            }],
        execute: function() {
            (function (Key) {
                Key[Key["left"] = 37] = "left";
                Key[Key["right"] = 39] = "right";
                Key[Key["up"] = 38] = "up";
                Key[Key["down"] = 40] = "down";
            })(Key || (Key = {}));
            exports_1("Key", Key);
            ;
            KeyEvent = (function () {
                function KeyEvent() {
                    var _this = this;
                    this.onkeypress = new EventDispatcher_1.EventDispatcher();
                    this.key_handler = function (e) {
                        switch (e.which) {
                            case Key.left:
                                _this.onkeypress.trigger(Key.left);
                                break;
                            case Key.right:
                                _this.onkeypress.trigger(Key.right);
                                break;
                            case Key.up:
                                _this.onkeypress.trigger(Key.up);
                                break;
                            case Key.down:
                                _this.onkeypress.trigger(Key.down);
                                break;
                        }
                    };
                    $(document).keydown(this.key_handler);
                }
                Object.defineProperty(KeyEvent.prototype, "KeyPress", {
                    get: function () { return this.onkeypress; },
                    enumerable: true,
                    configurable: true
                });
                return KeyEvent;
            }());
            exports_1("KeyEvent", KeyEvent);
        }
    }
});
//# sourceMappingURL=KeyEvent.js.map