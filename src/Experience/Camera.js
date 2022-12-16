import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from './Experience.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.setInstance()
        this.setOrbitControls()
        window.addEventListener("deviceorientation", this.handleOrientation, true);
    }
    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(10,10,3)
        this.scene.add(this.instance)
    }
    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.target = new THREE.Vector3(0, 5 , 0)
    }
    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    update()
    {
        this.controls.update()
    }
    handleOrientation(event) {
        var absolute = event.absolute;
        var alpha    = event.alpha;
        var beta     = event.beta;
        var gamma    = event.gamma;
        console.log(new THREE.Vector3(alpha,beta,gamma))
        this.controls.target = new THREE.Vector3(alpha,beta,gamma)
        // Do stuff with the new orientation data
      }
      
}