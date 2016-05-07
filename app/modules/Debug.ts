export class Debug {
    debugg: JQuery;
    constructor() {
        $('body').append('<div id="debug"></div>');
        this.debugg = $('#debug');
    }

    log(message: any) {
        this.debugg.html(message);
    }
}
