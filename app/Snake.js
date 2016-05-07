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
                    this.size = .9;
                    this.fps = 20;
                    this.size_playground = Math.round(40 * this.size);
                    this.scene = new THREE.Scene();
                    this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
                    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                    this.camera.position.z = 70 * this.size;
                    this.renderer = new THREE.WebGLRenderer({ alpha: true });
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                    document.body.appendChild(this.renderer.domElement);
                    this.debug = new Debug_1.Debug();
                }
                Snake.prototype.create_snake = function () {
                    this.snake_length = 2;
                    for (var i = this.snake_length; i >= 0; i--) {
                        this.scene.remove(this.snake_array[i]);
                    }
                    this.snake_array = [];
                    for (var i = this.snake_length - 1; i >= 0; i--) {
                        var cube = this.snake_cube();
                        cube.position.set(i, Math.round(this.size_playground / 2), 0);
                        this.snake_array.push(cube);
                        this.scene.add(cube);
                    }
                };
                Snake.prototype.create_food = function () {
                    this.scene.remove(this.food);
                    var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
                    var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                    this.food = new THREE.Mesh(geometry, material);
                    this.food.position.set(Math.round(Math.random() / 2 * this.size_playground), Math.round(Math.random() / 2 * this.size_playground), 0);
                    this.scene.add(this.food);
                };
                Snake.prototype.build_playground = function () {
                    var geometry = new THREE.PlaneGeometry(this.size_playground, this.size_playground);
                    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(Math.round(this.size_playground / 2), Math.round(this.size_playground / 2), -1));
                    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, opacity: .4, transparent: true });
                    this.playground = new THREE.Mesh(geometry, material);
                    this.playground.position.set(0, 0, 0);
                    this.scene.add(this.playground);
                };
                Snake.prototype.move_snake = function () {
                    this.camera.lookAt(new THREE.Vector3(this.snake_array[0].position.x, this.snake_array[0].position.y, this.snake_array[0].position.z + 5));
                    this.nx = this.snake_array[0].position.x;
                    this.ny = this.snake_array[0].position.y;
                    this.debug.log(this.nx + '/' + this.ny + '///' + this.food.position.x + '/' + this.food.position.y);
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
                    if (this.nx == -1 || this.nx == Math.round(this.size_playground / this.size) || this.ny == -1 || this.ny == Math.round(this.size_playground / this.size) || this.check_collision()) {
                        //restart game
                        alert("die");
                    }
                    if (this.nx == this.food.position.x && this.ny == this.food.position.y) {
                        var cube = this.snake_cube();
                        this.snake_array.push(cube);
                        this.scene.add(cube);
                        this.create_food();
                    }
                    var tail = this.snake_array.pop();
                    tail.position.x = this.nx;
                    tail.position.y = this.ny;
                    this.snake_array.unshift(tail);
                };
                Snake.prototype.check_collision = function () {
                };
                Snake.prototype.loop = function () {
                    var _this = this;
                    this.loop_timer = setInterval(function () { return _this.render(); }, 1000 / this.fps);
                };
                Snake.prototype.render = function () {
                    this.move_snake();
                    this.renderer.render(this.scene, this.camera);
                };
                Snake.prototype.snake_cube = function () {
                    var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
                    var material = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0x666666, emissive: 0x00ff00, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true });
                    var cube = new THREE.Mesh(geometry, material);
                    return cube;
                };
                return Snake;
            }());
            ;
            StartGame = (function () {
                function StartGame() {
                    var _this = this;
                    var speed = .01;
                    $(window).ready(function () { return _this.init(); });
                }
                StartGame.prototype.init = function () {
                    var snake_game = new Snake();
                    snake_game.build_playground();
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
                };
                return StartGame;
            }());
            new StartGame();
        }
    }
});
//# sourceMappingURL=Snake.js.map