import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter{
    constructor(){
        super();
        
        //setup
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        //delta time is the time between two frames => 16.666 because the default
        // screens are running at 60 fps(frames per second) 60/3 = 16.666
        this.delta = 16;

        window.requestAnimationFrame(() => {
            this.tick()
        });

}

    //check a tick() method and do the same loop as we did in the script.js file
    tick(){
       // console.log('tick');
        const currentTime = Date.now();

        //to calculate the deta time between two frames: 'now'(currentTime) and 'the previous frame'(this.current)
        this.delta = currentTime - this.current;
        //console.log(this.delta);
        // to update the currentTime
        this.current = currentTime;
        //console.log(currentTime);
        this.elapsed = this.current - this.start;
       // console.log(this.elapsed);

       // to trigger a tick event
       this.trigger('tick');

        window.requestAnimationFrame(() => {
            this.tick();
        });
    }

}

