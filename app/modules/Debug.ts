export class Debug {
    canvas: any;
    context: CanvasRenderingContext2D;

    constuctor() {

        $(document).ready(() => {

                this.canvas = $('canvas')[0];
                this.context = this.canvas.getContext('2d');

                console.log(this.context);

        });
    }

    log() {
        //this.ctx.fillText(this.snake_array[0].position, 5, window.innerHeight - 5);
    }
}
