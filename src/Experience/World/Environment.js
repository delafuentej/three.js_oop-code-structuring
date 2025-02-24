import * as THREE from 'three';
import Experience from "../Experience.js"

export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setDirectionalLight();
        this.setEnvironmentMap();
       
    }
    setDirectionalLight(){
        this.directionalLight = new THREE.DirectionalLight('#ffffff', 4);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.camera.far = 15;
        this.directionalLight.shadow.mapSize.set(1024, 1024);
        this.directionalLight.shadow.normalBias = 0.05;
        this.directionalLight.position.set(3.5, 2, - 1.25);
        this.scene.add(this.directionalLight)

    };

    setEnvironmentMap(){
        this.environmentMap = {};
        this.environmentMap.intensity = 0.4;
        this.environmentMap.texture = this.resources.items.environmentMapTexture;
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;

        this.scene.environment = this.environmentMap.texture;

        //updateMaterials method to the environmentMap property wicht will traverse
        // the scene and update materials if it needed:
        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if( child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity =  this.environmentMap.intensity
                    child.material.needsUpdate = true;
                }
            })
        }
        this.environmentMap.updateMaterials();

    };



};

//const environmentMap = cubeTextureLoader.load([
    //     '/textures/environmentMap/px.jpg',
    //     '/textures/environmentMap/nx.jpg',
    //     '/textures/environmentMap/py.jpg',
    //     '/textures/environmentMap/ny.jpg',
    //     '/textures/environmentMap/pz.jpg',
    //     '/textures/environmentMap/nz.jpg'
    // ])
    
    // environmentMap.colorSpace = THREE.SRGBColorSpace
    
    // // scene.background = environmentMap
    // scene.environment = environmentMap
    
    // debugObject.envMapIntensity = 0.4