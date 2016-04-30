import {EventDispatcher, IEventDispatcher} from './EventDispatcher';

export enum Key {
    left = 37,
    right = 39,
    up = 38,
    down = 40
};


export class KeyEvent {

    private onkeypress = new EventDispatcher<Key>();
    public get KeyPress(): IEventDispatcher<Key> { return this.onkeypress; }

    constructor() {
        $(document).keydown(this.key_handler);
    }

    key_handler = (e) => {
        switch (e.which) {
            case Key.left:
                this.onkeypress.trigger(Key.left);
                break;

            case Key.right:
                this.onkeypress.trigger(Key.right);
                break;

            case Key.up:
                this.onkeypress.trigger(Key.up);
                break;

            case Key.down:
                this.onkeypress.trigger(Key.down);
                break;
        }
    }
}
