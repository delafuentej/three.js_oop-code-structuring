 import GUI from 'lil-gui';

export default class Debug {
    constructor(){
        this.active = window.location.hash === '#debug';

        if(this.active){
            this.gui = new GUI();
        }
    }
}

// const gui = new GUI()
// const debugObject = {}
// gui.add(debugObject, 'envMapIntensity').min(0).max(4).step(0.001).onChange(updateAllMaterials)

// gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
// gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
// gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
// gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')