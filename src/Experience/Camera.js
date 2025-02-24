import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Experience from './Experience.js';

export default class Camera {
    // we have to create the OrbitControls inside the Camera class
    // we have to have access to the Experience Class (1. from a global variable, 
    //2. by sending it as a parameter,  3. or by using a singleton pattern: a sigleton is a class
    // that will instantiate just like usual when it is the first time , but, for all the following times,
    // it will return that first instance)
    constructor(){
         // 1. from a global variable:
         // it works but having properties on window is not a good practice
         // an a external code can mess up with our code
        // this.experience = window.experience;
       
         // 2. receive the Experience Class as a parameter 
       // this.experience = experience;
        //  console.log(this.experience.sizes.width);

        // 3. singleton
        this.experience = new Experience();
        console.log(this.experience);
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.setInstance();
        this.setControls();
        this.resize();
        this.update();

        this.sizes.on('resize', ()=> {
            console.log('resize camera')
        })
    }

    setInstance(){
        this.instance =  new THREE.PerspectiveCamera(35, this.sizes.width/this.sizes.height, 0.1, 100);
        this.instance.position.set(6, 4, 8);
        this.scene.add(this.instance);
    };

    setControls(){
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    };

    resize(){
            // Update camera
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    };

    update(){
        this.controls.update();
    }
}
