///<reference path='../typings/threejs/three.d.ts'/>
import {KeyEvent} from './modules/KeyEvent';
import {Key} from './modules/KeyEvent';
import {IEventDispatcher} from './modules/EventDispatcher';
import {Debug} from './modules/Debug';

class Snake {

    scene: THREE.Scene;
    cube: THREE.Mesh;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    snake_length: number;
    snake_array: Array<THREE.Mesh> = new Array<THREE.Mesh>();
    direction: Key = Key.right
    size: number;
    nx: number;
    ny: number;
    fps: number = 20;
    loop_timer: number;
    size_playground = 70;
    debug: Debug;
    private timer;


    constructor() {

        this.debug = new Debug();

        this.size = .8;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.z = 70 * this.size;
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    create_snake() {
        this.snake_length = 5;

        var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        var material =  new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0x00ff00, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true });

        for (var i = this.snake_length; i >= 0; i--) {
            this.scene.remove(this.snake_array[i]);
        }
        this.snake_array = [];

        for (var i = this.snake_length; i >= 0; i--) {
            var cube: THREE.Mesh = new THREE.Mesh(geometry, material)
            cube.position.set(i, 0, 0);
            this.snake_array.push(cube);
            this.scene.add(cube);
        }

    }

    create_food() {

        var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        var food: THREE.Mesh = new THREE.Mesh(geometry, material);
        food.position.set(Math.round(Math.random() * (this.size_playground - this.size) / this.size),
            Math.round(Math.random() * (this.size_playground - this.size) / this.size), 0);
        this.scene.add(food);
    }

    move_snake() {

        this.camera.lookAt(this.snake_array[0].position)
        if (this.snake_array[0].position.z < 0) {
        //    this.camera.position.x = this.snake_array[0].position.x

        //    this.camera.position.y = this.snake_array[0].position.y;
                        this.camera.position.z = this.snake_array[0].position.z - 7
        } else {
        //    this.camera.position.x = this.snake_array[0].position.x

        //    this.camera.position.y = this.snake_array[0].position.y;
            this.camera.position.z = this.snake_array[0].position.z + 7;
        }
        this.nx = this.snake_array[0].position.x;
        this.ny = this.snake_array[0].position.y;

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

        var tail = this.snake_array.pop(); //pops out the last cell
        tail.position.x = this.nx;
        tail.position.y = this.ny;

        this.snake_array.unshift(tail);


        for (var i = 0; i < this.snake_length; i++) {

            //this.snake_array[i].position.y = tail.position.y
            //this.snake_array[i].position.x= tail.position.x
        }
    }

    loop(): void {

        this.loop_timer = setInterval(() => this.render(), 1000 / this.fps);
    }

    render(): void {
        this.move_snake();
        this.renderer.render(this.scene, this.camera);
    }
};





class StartGame {

    constructor() {
        const speed: number = .01;
        $(window).ready(() => {
            var snake_game = new Snake();
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
        });
    }
}


new StartGame();
