System.register(['./modules/KeyEvent'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var KeyEvent_1, KeyEvent_2;
    var Snake, StartGame;
    return {
        setters:[
            function (KeyEvent_1_1) {
                KeyEvent_1 = KeyEvent_1_1;
                KeyEvent_2 = KeyEvent_1_1;
            }],
        execute: function() {
            Snake = (function () {
                function Snake() {
                    this.scene = new THREE.Scene();
                    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    this.renderer = new THREE.WebGLRenderer({ alpha: true });
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                    document.body.appendChild(this.renderer.domElement);
                    this.camera.position.z = 5;
                }
                Snake.prototype.create_snake = function () {
                    this.snake_length = 5;
                    var geometry = new THREE.BoxGeometry(.5, .5, .5);
                    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                    for (var i = this.snake_length - 1; i >= 0; i++) {
                        var cube = new THREE.Mesh(geometry, material);
                        cube.position.set(i, 0, 0);
                        this.scene.add(cube);
                        this.snake_array.push(cube);
                    }
                };
                Snake.prototype.render = function () {
                    var _this = this;
                    requestAnimationFrame(function () { return _this.render(); });
                    this.renderer.render(this.scene, this.camera);
                };
                return Snake;
            }());
            ;
            StartGame = (function () {
                function StartGame() {
                    $(window).ready(function () {
                        var snake_game = new Snake();
                        snake_game.render();
                        snake_game.create_snake();
                        var keyevent = new KeyEvent_1.KeyEvent();
                        keyevent.KeyPress.on(function (e) {
                            switch (e) {
                                case KeyEvent_2.Key.up:
                                    snake_game.camera.rotation.x += 0.1;
                                    break;
                                case KeyEvent_2.Key.down:
                                    snake_game.camera.rotation.x -= 0.1;
                                    break;
                                case KeyEvent_2.Key.left:
                                    snake_game.camera.rotation.y -= 0.1;
                                    break;
                                case KeyEvent_2.Key.right:
                                    snake_game.camera.rotation.y += 0.1;
                                    break;
                            }
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