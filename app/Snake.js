System.register(['./modules/KeyEvent'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var KeyEvent_1;
    var Snake, StartGame;
    return {
        setters:[
            function (KeyEvent_1_1) {
                KeyEvent_1 = KeyEvent_1_1;
            }],
        execute: function() {
            Snake = (function () {
                function Snake() {
                    this.renderer = new THREE.WebGLRenderer({ alpha: true });
                    this.renderer.setSize(500, 500);
                    this.renderer.setClearColor('rgb(0,0,0)', 1);
                    document.getElementById('snake_area').appendChild(this.renderer.domElement);
                }
                Snake.prototype.start = function () {
                    this.renderer.clear();
                };
                return Snake;
            }());
            ;
            StartGame = (function () {
                function StartGame() {
                    $(window).ready(function () {
                        new Snake().start();
                        var keyevent = new KeyEvent_1.KeyEvent();
                        keyevent.KeyPress.on(function (e) {
                            console.log(e);
                        });
                    });
                }
                return StartGame;
            }());
            new StartGame();
        }
    }
});
//# sourceMappingURL=Snake.js.map