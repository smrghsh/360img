import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.setAmbientLight()
    }
    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight('#ffffff', 2.0)
        this.scene.add(this.ambientLight)
    }
}