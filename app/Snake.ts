///<reference path='../typings/threejs/three.d.ts'/>
import {KeyEvent} from './modules/KeyEvent';
import {IEventDispatcher} from './modules/EventDispatcher';

class Snake {

    renderer: THREE.WebGLRenderer;
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(500, 500);
        this.renderer.setClearColor( 'rgb(0,0,0)', 1);
        document.getElementById('snake_area').appendChild(this.renderer.domElement);
    }

    start() {
        this.renderer.clear();
    }
};

class StartGame{
    constructor(){
        $(window).ready(
            function(){
                new Snake().start();
                var keyevent = new KeyEvent();
                keyevent.KeyPress.on((e?) =>{
                    console.log(e)
                }

                );
            }
        );
    }

}


new StartGame();
