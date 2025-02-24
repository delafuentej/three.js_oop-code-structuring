import EventEmitter from "./EventEmitter.js";

 export default class Sizes extends EventEmitter {
    constructor(){
        super();
        //setup
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
       

        //At some point, we will also have to update other values like the camera or 
        //the renderer when a resize occurs. We could listen to the resize event on window 
        //like we just did, but instead, we are going to use the Sizes class to warn the other 
        //classes about that change.
        //What we are going to do now is make a little change to our Sizes class so that it can trigger events

        // we want out Sizes class to trigger events. Later other classes are going
        // to listen to those events   
        // Resize Event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);

            this.trigger('resize');
            
            
        });

    }
 }

