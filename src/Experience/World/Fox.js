import * as THREE from 'three';
import Experience from "../Experience.js";

export default class Fox {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.debug = this.experience.debug;

        //DEbug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('fox');
        }
        //setup
        this.resource = this.resources.items.foxModel;

        this.setModel();
        this.setAnimation();

    };

    setModel(){
        this.model = this.resource.scene;
        this.model.scale.set(0.02, 0.02, 0.02);
        this.scene.add(this.model);

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true;
            }
        })
    };

    setAnimation(){
        this.animation =  {}
        this.animation.mixer = new THREE.AnimationMixer(this.model);
        // this.animation.action = this.animation.mixer.clipAction(this.resource.animations[1])
        // this.animation.action.play();
        // in this method create all three actions available in this.resource.animations and save
        //them in an actions property
        this.animation.actions = {};

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0]);
        this.animation.actions.walking =  this.animation.mixer.clipAction(this.resource.animations[1]);
        this.animation.actions.running =  this.animation.mixer.clipAction(this.resource.animations[2]);

        // we want a smooth transition between animations  => AnimationAction => crossFadeTo()
        // this method needst to be called on the incoming action, with the previos action as the first
        // parameter and the duration of the transition (in seconds) as the second parameter

        this.animation.actions.current = this.animation.actions.idle;
        this.animation.actions.current.play();

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name];
            const oldAction =  this.animation.actions.current;

           newAction.reset();
            newAction.play();
            oldAction.crossFadeTo(newAction, 1);

            // save the new action in the current action property
            this.animation.actions.current = newAction;
        }

        //Debug
        if(this.debug.active){
            
            const debugObject = {
                playIdle: () =>{ this.animation.play('idle')},
                playWalking: () => {this.animation.play('walking')},
                playRunning: () => {this.animation.play('running')}
            };
            this.debugFolder.add(debugObject,'playIdle');
            this.debugFolder.add(debugObject,'playWalking');
            this.debugFolder.add(debugObject,'playRunning');
        }


    }
    update(){
        this.animation.mixer.update(this.time.delta * 0.001);
    }
}

// let foxMixer = null

// gltfLoader.load(
//     '/models/Fox/glTF/Fox.gltf',
//     (gltf) =>
//     {
//         // Model
//         gltf.scene.scale.set(0.02, 0.02, 0.02)
//         scene.add(gltf.scene)

//         // Animation
//         foxMixer = new THREE.AnimationMixer(gltf.scene)
//         const foxAction = foxMixer.clipAction(gltf.animations[0])
//         foxAction.play()

//         // Update materials
//         updateAllMaterials()
//     }
// )
