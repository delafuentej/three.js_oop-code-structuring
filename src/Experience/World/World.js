// we have to separate everything  that composes our World in  a class

import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from './Floor.js';
import Fox from "./Fox.js";

class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
       
       

        //in the world class: retrieve the resources instance and listen
        // to the ready event before instantiating the Environment Class
        this.resources.on('ready', ()=> {
              //setup
            this.floor = new Floor();
            this.fox = new Fox();
            this.environment = new Environment();
           

        })

     

    };
    update(){
        if(this.fox) this.fox.update();
    }
};

export default World;