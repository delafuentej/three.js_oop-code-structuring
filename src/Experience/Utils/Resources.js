import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import EventEmitter from "./EventEmitter";


    //this class => to centralize asset loading in a dedicated
    // class that will: 
    // - instantiate all of the loaders we need
    // - loop through an array of assets and load them
    // - trigger an event when all assets are loaded
    // Each resource in the array will be defined by an object
    //composed of the following properties:
        // -name: it will be used to retrieve the loaded resource
        // -type: in order to know what loader to use
        // -path:  the paths ofe the files to load

    
    export default class Resources extends EventEmitter{
    constructor(sources){
        super()
       this.sources = sources;
       console.log(this.resources);

       //setup
       this.items = {};
       this.toLoad = this.sources.length;
       this.loaded = 0;

       //loaders
       this.setLoaders();
       this.startLoading();
      // this.sourceLoaded()
    };
    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    };

    startLoading(){
        //load each source
        for(const source of this.sources){
            switch (source.type) {
                case 'gltfModel':
                    this.loaders.gltfLoader.load(
                        source.path, 
                        (file) => {
                        this.sourceLoaded(source, file);
                        }
                    );
                    break;
                case 'texture':
                    this.loaders.textureLoader.load(
                        source.path, 
                        (file) => {
                        this.sourceLoaded(source, file);
                        }
                    );
                    break;
                case 'cubeTexture':
                    this.loaders.cubeTextureLoader.load(
                        source.path, 
                        (file) => {
                        this.sourceLoaded(source, file);
                        }
                    );
                    break;
                default:
                    console.warn(`Source type unknow: ${source.type}`);
            }

            }
    };

    sourceLoaded(source, file)
    {
        this.items[source.name] = file;

        this.loaded++;

        if(this.loaded === this.toLoad){
            console.log('All sources loaded');
            this.trigger('ready');
        }
    };
}