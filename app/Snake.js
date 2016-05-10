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
                    this.snake_speed = 1;
                    this.fps = 20;
                    this.size_playground = Math.round(40 * this.size);
                    this.scene = new THREE.Scene();
                    this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
                    this.camera.position.z = 70 * this.size;
                    this.camera.position.x = this.size_playground / 2;
                    this.camera.position.y = this.size_playground / 2;
                    this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
                    this.dirLight.color.setHSL(0.1, 1, 0.95);
                    this.dirLight.position.set(this.size_playground / 2, this.size_playground / 2, 90);
                    this.dirLight.position.multiplyScalar(50);
                    this.scene.add(this.dirLight);
                    this.dirLight.castShadow = true;
                    this.dirLight.shadowMapWidth = 2048;
                    this.dirLight.shadowMapHeight = 2048;
                    var d = 50;
                    this.dirLight.shadowCameraLeft = -d;
                    this.dirLight.shadowCameraRight = d;
                    this.dirLight.shadowCameraTop = d;
                    this.dirLight.shadowCameraBottom = -d;
                    this.dirLight.shadowCameraFar = 3500;
                    this.dirLight.shadowBias = -0.0001;
                    this.renderer = new THREE.WebGLRenderer({ alpha: true, logarithmicDepthBuffer: true });
                    this.renderer.setPixelRatio(window.devicePixelRatio);
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                    this.renderer.shadowMap.enabled = true;
                    this.renderer.shadowMap.cullFace = THREE.CullFaceBack;
                    document.body.appendChild(this.renderer.domElement);
                    this.debug = new Debug_1.Debug();
                }
                Snake.prototype.create_snake = function () {
                    this.snake_length = 5;
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
                Snake.prototype.create_sound = function () {
                    this.sound = new Howl({
                        urls: ['/sounds/snake3d.ogg', '/sounds/snake3d.mp3'],
                        sprite: {
                            'theme': [0, 69851],
                            'over': [70574, 6564],
                            'food': [77926, 2191],
                            'left': [80707, 1231],
                            'right': [82568, 1231],
                            'up': [84512, 1231],
                            'down': [86323, 1231]
                        }
                    });
                };
                Snake.prototype.create_food = function () {
                    this.scene.remove(this.food);
                    var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
                    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, opacity: .4, transparent: true });
                    this.food = new THREE.Mesh(geometry, material);
                    this.food.position.set(Math.round(Math.random() / 2 * this.size_playground), Math.round(Math.random() / 2 * this.size_playground), 0);
                    this.scene.add(this.food);
                };
                Snake.prototype.build_playground = function () {
                    var geometry = new THREE.CubeGeometry(this.size_playground, this.size_playground, 4);
                    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(Math.round(this.size_playground / 2), Math.round(this.size_playground / 2), 0));
                    var cubeMaterials = [
                        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .2, side: THREE.DoubleSide }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .2, side: THREE.DoubleSide }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .2, side: THREE.DoubleSide }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .2, side: THREE.DoubleSide }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .3, side: THREE.DoubleSide }),
                    ];
                    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
                    var cube = new THREE.Mesh(geometry, cubeMaterial);
                    cube.position.set(0, 0, 0);
                    this.scene.add(cube);
                };
                Snake.prototype.move_snake = function () {
                    this.nx = this.snake_array[0].position.x;
                    this.ny = this.snake_array[0].position.y;
                    this.camera.lookAt(new THREE.Vector3(this.nx, this.ny, 0));
                    //this.camera.position.x = this.nx;
                    //this.camera.position.y= this.ny;
                    this.debug.log(this.nx + '/' + this.ny + '///' + this.food.position.x + '/' + this.food.position.y);
                    switch (this.direction) {
                        case KeyEvent_2.Key.left:
                            this.nx -= this.snake_speed;
                            break;
                        case KeyEvent_2.Key.up:
                            this.ny += this.snake_speed;
                            break;
                        case KeyEvent_2.Key.down:
                            this.ny -= this.snake_speed;
                            break;
                        case KeyEvent_2.Key.right:
                            this.nx += this.snake_speed;
                            break;
                    }
                    if (this.nx == -1 || this.nx == Math.round(this.size_playground / this.size) || this.ny == -1 || this.ny == Math.round(this.size_playground / this.size) || this.check_collision()) {
                    }
                    if (this.nx == this.food.position.x && this.ny == this.food.position.y) {
                        this.sound.play('food');
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
                Snake.prototype.keys = function () {
                    var _this = this;
                    var keyevent = new KeyEvent_1.KeyEvent();
                    keyevent.KeyPress.on(function (e) {
                        if (e == KeyEvent_2.Key.left && _this.direction != KeyEvent_2.Key.right) {
                            _this.direction = KeyEvent_2.Key.left;
                            _this.sound.play('left').loop(false);
                        }
                        if (e == KeyEvent_2.Key.right && _this.direction != KeyEvent_2.Key.left) {
                            _this.direction = KeyEvent_2.Key.right;
                            _this.sound.play('right').loop(false);
                        }
                        if (e == KeyEvent_2.Key.down && _this.direction != KeyEvent_2.Key.up) {
                            _this.direction = KeyEvent_2.Key.down;
                            _this.sound.play('down').loop(false);
                        }
                        if (e == KeyEvent_2.Key.up && _this.direction != KeyEvent_2.Key.down) {
                            _this.direction = KeyEvent_2.Key.up;
                            _this.sound.play('up').loop(false);
                        }
                    });
                    var theme = this.sound;
                    //theme.play('theme').loop(true);
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
                    snake_game.create_sound();
                    snake_game.build_playground();
                    snake_game.create_snake();
                    snake_game.create_food();
                    snake_game.render();
                    snake_game.loop();
                    snake_game.keys();
                };
                return StartGame;
            }());
            new StartGame();
        }
    }
});
//# sourceMappingURL=Snake.js.map