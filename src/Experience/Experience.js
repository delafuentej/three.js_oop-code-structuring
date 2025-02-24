import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import Camera from './Camera.js';
import Renderer  from './Renderer.js';
import World from './World/World.js';
import sources from './sources.js';

console.log(sources)

// to create a Experience Class in a singleton
let instance = null;

export default class Experience {

    constructor(canvas) {
        // singleton
        if(instance){
            return instance;
        };
         instance = this;
        // console.log(instance)
        //global access 
        window.experience = this;
        // options
        this.canvas = canvas;
        console.log(this.canvas);
        //setup
        this.sizes = new Sizes();
        this.time = new Time();

        //- setup three.js
        this.scene = new THREE.Scene();

        // -resources
        this.resources = new Resources(sources);
        // 2. from a parameter
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();



       // console.log(this.sizes.pixelRatio);
       // the on() method will listen to events and the trigger() method will trigger 
       // those events. We are going to trigger events from inside the class
       // and listen to those events from outside the class

       //Sizes resize event => to listen to the resize event
       this.sizes.on('resize', () => {
           this.resize();
       });
       // Time tick event => to listen  to the tick event
       this.time.on('tick', () => {
           this.update();
       });
    }

    resize(){
        //update camera when a resizes occurs
       this.camera.resize();
       this.renderer.resize();
    };
    update(){
       // we need to update  this class on each frame for the OrbitControls to work
       this.camera.update();
       this.world.update();
       this.renderer.update();
    };
}

