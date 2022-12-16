import * as THREE from 'three'
import horizontalGridVertexShader from '../../shaders/horizontalGrid/vertex.glsl'
import horizontalGridFragmentShader from '../../shaders/horizontalGrid/fragment.glsl'
import Experience from '../Experience.js'

export default class Floor{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        // this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.geometry = new THREE.PlaneGeometry( 30, 30 );
        this.horizontalGridMaterial = new THREE.ShaderMaterial({
            vertexShader: horizontalGridVertexShader,
            fragmentShader: horizontalGridFragmentShader,
            transparent: true,
        });
        this.floorPlane = new THREE.Mesh( this.geometry, this.horizontalGridMaterial );
        this.floorPlane.x -= 15
        this.floorPlane.z -=15
        this.floorPlane.rotation.x -= Math.PI/2;
        this.scene.add( this.floorPlane );
    }
}