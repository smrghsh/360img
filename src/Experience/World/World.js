import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resources.on('ready', () =>
        {
            // Setup
            console.log('resources ready')
            this.stars = new Stars()
            this.environment = new Environment()
        })
    
        // const geometry = new THREE.SphereGeometry( 13, 60, 40 );

        // we are doing a cylinder rn
        const geometry = new THREE.CylinderGeometry( 5, 5, 5, 60, 1, true);

        
        // invert the geometry on the x-axis so that all of the faces point inward
        geometry.scale( - 1, 1, 1 );
        // geometry.scale()
// 
        // const texture = new THREE.VideoTexture( video );

        // CHANGE THIS SOURCE HERE!!!!!
        const imageSource = './images/test2-warp-transformed.jpg'
        const image = new Image()
        const texture = new THREE.Texture(image)
        image.addEventListener('load', () =>
        {
            texture.needsUpdate = true
        })
        image.src = imageSource
        const material = new THREE.MeshBasicMaterial( { map: texture} );
        // const material = new THREE.MeshBasicMaterial( { color: "red" } );

        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.y += 4
        this.scene.add( mesh );
    }
    update() {
    }
}