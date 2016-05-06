System.register(['./modules/KeyEvent', './modules/Debug'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var KeyEvent_1, KeyEvent_2, Debug_1;
    var Snake, StartGame;
    return {
        setters:[
            function (KeyEvent_1_1) {
                KeyEvent_1 = KeyEvent_1_1;
                KeyEvent_2 = KeyEvent_1_1;
            },
            function (Debug_1_1) {
                Debug_1 = Debug_1_1;
            }],
        execute: function() {
            Snake = (function () {
                function Snake() {
                    this.snake_array = new Array();
                    this.direction = KeyEvent_2.Key.right;
                    this.fps = 20;
                    this.size_playground = 70;
                    this.debug = new Debug_1.Debug();
                    this.size = .8;
                    this.scene = new THREE.Scene();
                    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                    this.camera.position.z = 70 * this.size;
                    this.renderer = new THREE.WebGLRenderer({ alpha: true });
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                    document.body.appendChild(this.renderer.domElement);
                }
                Snake.prototype.create_snake = function () {
                    this.snake_length = 5;
                    var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
                    var material = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0x666666, emissive: 0x00ff00, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true });
                    for (var i = this.snake_length; i >= 0; i--) {
                        this.scene.remove(this.snake_array[i]);
                    }
                    this.snake_array = [];
                    for (var i = this.snake_length; i >= 0; i--) {
                        var cube = new THREE.Mesh(geometry, material);
                        cube.position.set(i, 0, 0);
                        this.snake_array.push(cube);
                        this.scene.add(cube);
                    }
                };
                Snake.prototype.create_food = function () {
                    var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
                    var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                    var food = new THREE.Mesh(geometry, material);
                    food.position.set(Math.round(Math.random() * (this.size_playground - this.size) / this.size), Math.round(Math.random() * (this.size_playground - this.size) / this.size), 0);
                    this.scene.add(food);
                };
                Snake.prototype.move_snake = function () {
                    this.camera.lookAt(this.snake_array[0].position);
                    if (this.snake_array[0].position.z < 0) {
                        //    this.camera.position.x = this.snake_array[0].position.x
                        //    this.camera.position.y = this.snake_array[0].position.y;
                        this.camera.position.z = this.snake_array[0].position.z - 7;
                    }
                    else {
                        //    this.camera.position.x = this.snake_array[0].position.x
                        //    this.camera.position.y = this.snake_array[0].position.y;
                        this.camera.position.z = this.snake_array[0].position.z + 7;
                    }
                    this.nx = this.snake_array[0].position.x;
                    this.ny = this.snake_array[0].position.y;
                    switch (this.direction) {
                        case KeyEvent_2.Key.left:
                            this.nx--;
                            break;
                        case KeyEvent_2.Key.up:
                            this.ny++;
                            break;
                        case KeyEvent_2.Key.down:
                            this.ny--;
                            break;
                        case KeyEvent_2.Key.right:
                            this.nx++;
                            break;
                    }
                    var tail = this.snake_array.pop(); //pops out the last cell
                    tail.position.x = this.nx;
                    tail.position.y = this.ny;
                    this.snake_array.unshift(tail);
                    for (var i = 0; i < this.snake_length; i++) {
                    }
                };
                Snake.prototype.loop = function () {
                    var _this = this;
                    this.loop_timer = setInterval(function () { return _this.render(); }, 1000 / this.fps);
                };
                Snake.prototype.render = function () {
                    this.move_snake();
                    this.renderer.render(this.scene, this.camera);
                };
                return Snake;
            }());
            ;
            StartGame = (function () {
                function StartGame() {
                    var speed = .01;
                    $(window).ready(function () {
                        var snake_game = new Snake();
                        snake_game.create_snake();
                        snake_game.create_food();
                        snake_game.render();
                        snake_game.loop();
                        var keyevent = new KeyEvent_1.KeyEvent();
                        keyevent.KeyPress.on(function (e) {
                            if (e == KeyEvent_2.Key.left && snake_game.direction != KeyEvent_2.Key.right)
                                snake_game.direction = KeyEvent_2.Key.left;
                            if (e == KeyEvent_2.Key.right && snake_game.direction != KeyEvent_2.Key.left)
                                snake_game.direction = KeyEvent_2.Key.right;
                            if (e == KeyEvent_2.Key.down && snake_game.direction != KeyEvent_2.Key.up)
                                snake_game.direction = KeyEvent_2.Key.down;
                            if (e == KeyEvent_2.Key.up && snake_game.direction != KeyEvent_2.Key.down)
                                snake_game.direction = KeyEvent_2.Key.up;
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