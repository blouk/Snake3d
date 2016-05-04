///<reference path='../typings/threejs/three.d.ts'/>
import {KeyEvent} from './modules/KeyEvent';
import {Key} from './modules/KeyEvent';
import {IEventDispatcher} from './modules/EventDispatcher';

class Snake {

    scene: THREE.Scene;
    cube: THREE.Mesh;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    snake_length:number;
    snake_array:Array<THREE.Mesh>;


    private timer;
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);



        document.body.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;

    }

    create_snake() {
        this.snake_length = 5;
        var geometry = new THREE.BoxGeometry(.5, .5, .5);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        for(var i = this.snake_length-1;i>=0;i++){
            var cube = new THREE.Mesh(geometry, material)
            cube.position.set(i, 0, 0);
            this.scene.add(cube);
            this.snake_array.push(cube);
        }
    }


    render() {
        requestAnimationFrame(() => this.render());
        this.renderer.render(this.scene, this.camera);
    }
};





class StartGame {
    constructor() {
        $(window).ready(
            function() {
                var snake_game = new Snake();
                snake_game.render();
                snake_game.create_snake();
                var keyevent = new KeyEvent();
                keyevent.KeyPress.on((e: Key) => {
                    switch (e) {
                        case Key.up: snake_game.camera.rotation.x += 0.1;
                            break;

                        case Key.down: snake_game.camera.rotation.x -= 0.1;
                            break;

                        case Key.left:
                            snake_game.camera.rotation.y -= 0.1;
                            break;

                        case Key.right:
                            snake_game.camera.rotation.y += 0.1;
                            break;
                    }

                }
                    );
            }
            );
    }

}


new StartGame();
