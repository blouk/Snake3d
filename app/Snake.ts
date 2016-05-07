///<reference path='../typings/threejs/three.d.ts'/>
import {KeyEvent} from './modules/KeyEvent';
import {Key} from './modules/KeyEvent';
import {IEventDispatcher} from './modules/EventDispatcher';
import {Debug} from './modules/Debug';

class Snake {

    scene: THREE.Scene;
    cube: THREE.Mesh;
    food: THREE.Mesh;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    playground: THREE.Mesh;
    snake_length: number;
    snake_array: Array<THREE.Mesh> = new Array<THREE.Mesh>();
    direction: Key = Key.right
    size: number = .9;
    nx: number;
    ny: number;
    fps: number = 20;
    loop_timer: number;
    size_playground = Math.round(40 * this.size);
    debug: any;
    private timer;


    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.z = 70 * this.size;
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.debug = new Debug();
    }

    create_snake() {
        this.snake_length = 2;

        for (var i = this.snake_length; i >= 0; i--) {
            this.scene.remove(this.snake_array[i]);
        }
        this.snake_array = [];
        for (var i = this.snake_length - 1; i >= 0; i--) {
            var cube: THREE.Mesh = this.snake_cube();
            cube.position.set(i, Math.round(this.size_playground / 2), 0);
            this.snake_array.push(cube);
            this.scene.add(cube);
        }

    }

    create_food() {
        this.scene.remove(this.food)
        var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.food = new THREE.Mesh(geometry, material);
        this.food.position.set(Math.round(Math.random() / 2 * this.size_playground), Math.round(Math.random() / 2 * this.size_playground), 0);
        this.scene.add(this.food);
    }

    build_playground() {

        var geometry = new THREE.PlaneGeometry(this.size_playground, this.size_playground);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(Math.round(this.size_playground / 2), Math.round(this.size_playground / 2), -1));
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, opacity: .4, transparent: true });
        this.playground = new THREE.Mesh(geometry, material);
        this.playground.position.set(0, 0, 0)
        this.scene.add(this.playground);
    }

    move_snake() {
        this.camera.lookAt(new THREE.Vector3(this.snake_array[0].position.x, this.snake_array[0].position.y, this.snake_array[0].position.z + 5))
        this.nx = this.snake_array[0].position.x;
        this.ny = this.snake_array[0].position.y;
        this.debug.log(this.nx + '/' + this.ny + '///' + this.food.position.x + '/' + this.food.position.y);
        switch (this.direction) {
            case Key.left:
                this.nx--;
                break;

            case Key.up:
                this.ny++;
                break;

            case Key.down:
                this.ny--;
                break;

            case Key.right:
                this.nx++;
                break;
        }





        if (this.nx == -1 || this.nx == Math.round(this.size_playground / this.size) || this.ny == -1 || this.ny == Math.round(this.size_playground / this.size) || this.check_collision()) {
            //restart game
            alert("die");
            //Lets organize the code a bit now.
        }

        if (this.nx == this.food.position.x && this.ny == this.food.position.y) {

            var cube: THREE.Mesh = this.snake_cube();
            this.snake_array.push(cube);
            this.scene.add(cube);
            this.create_food();
        }

        var tail = this.snake_array.pop();
        tail.position.x = this.nx;
        tail.position.y = this.ny;

        this.snake_array.unshift(tail);

    }

    check_collision() {

    }


    loop(): void {

        this.loop_timer = setInterval(() => this.render(), 1000 / this.fps);
    }

    render(): void {
        this.move_snake();
        this.renderer.render(this.scene, this.camera);
    }


    snake_cube(): THREE.Mesh {
        var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        var material = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0x666666, emissive: 0x00ff00, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true });
        var cube: THREE.Mesh = new THREE.Mesh(geometry, material);
        return cube;
    }
};





class StartGame {

    constructor() {
        const speed: number = .01;
        $(window).ready(() => this.init());
    }

    init() {
        var snake_game = new Snake();
        snake_game.build_playground();
        snake_game.create_snake();
        snake_game.create_food();
        snake_game.render();
        snake_game.loop();


        var keyevent = new KeyEvent();
        keyevent.KeyPress.on((e: Key) => {
            if (e == Key.left && snake_game.direction != Key.right) snake_game.direction = Key.left;
            if (e == Key.right && snake_game.direction != Key.left) snake_game.direction = Key.right;
            if (e == Key.down && snake_game.direction != Key.up) snake_game.direction = Key.down;
            if (e == Key.up && snake_game.direction != Key.down) snake_game.direction = Key.up;

        });
    }
}


new StartGame();        
