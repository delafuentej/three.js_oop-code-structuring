import * as THREE from 'three';
import Debug from './Utils/Debug.js';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import Camera from './Camera.js';
import Renderer  from './Renderer.js';
import World from './World/World.js';
import sources from './sources.js';

// At some point, it needs to destroy parts of the experience,  or even
// the whole thing
// It could be because the animation is done, the player moved to another level
// the WebGl is not visible anymore or the fox is running away
// 1. Stop time ans resize events => destroy method


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
        this.debug = new Debug();
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

    destroy(){
        //method of EventEmitter class
        this.sizes.off('resize');
        this.time.off('tick');

        // use the traverse method on the scene
        this.scene.traverse((child) => {
            // we need to dispose of geometries, materials, textures
            // controls, passes, etc
            if(child instanceof THREE.Mesh){
                child.geometry.dispose();

                //loop through the material propertis
                for(const key in  child.material){
                    const value = child.material[key]
                    // test if there is a dispose function
                    if(value && typeof value.dispose === 'function'){
                        value.dispose();
                    }
                }
            }
        })

        //orbit controls
        this.camera.controls.dispose();

        //renderer
        this.renderer.instance.dispose();

        if(this.debug.active){
            this.debug.gui.destroy()
        }
    }
}

