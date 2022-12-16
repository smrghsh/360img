import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Sizes from "./Utils/Sizes.js"
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import sources from './sources.js'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'
import Controllers from './Controllers.js'

let instance = null

export default class Experience
{
    constructor(canvas){
        if (instance){
            return instance
        }
        instance = this
        // Global access
        window.experience = this
        this.canvas = canvas
        this.debug = new Debug()

        this.sizes = new Sizes()
        this.time = new Time()
        this.lastUpdated = this.time.current
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.world = new World()
        this.camera = new Camera()
        this.renderer = new Renderer()

        this.renderer.instance.xr.enabled = true;
        document.body.appendChild( VRButton.createButton( this.renderer.instance ) );
        this.renderer.instance.setAnimationLoop( ()=> {
            // tick();
            this.renderer.instance.render( this.scene, this.camera.instance );
        });


        this.controllers = new Controllers()


        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        this.INTERSECTED = null
        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })
        window.addEventListener('click', () =>
        {
            if(this.INTERSECTED)
            {
                // do something here if there is something in this.INTERSECTED
            }
        })
        this.sizes.on('resize', ()=>
        {
            this.resize()
            this.camera.resize()
            this.renderer.resize()
        })
        this.time.on('tick', ()=>
        {
            this.update()
        })
        
        

    }

    resize()
    {
        console.log('resized occured')
        this.camera.resize()
    }
    update()
    {
        this.camera.update()
        // this.renderer.update()
        this.world.update()
        // this.world.circles.undulate(this.time.elapsed)
        // this.world.hypercube.wub(this.time.elapsed)
        //https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html
        
        //change this to be controller if controller is active
        this.raycaster.setFromCamera( this.mouse, this.camera.instance );
        // console.log(this.mouse)
        // TODO, make raycaster its own class
        // const intersects = this.raycaster.intersectObjects( this.scene.children, false );
        // if ( intersects.length > 0 ) {
        //     if ( this.INTERSECTED != intersects[ 0 ].object ) {
        //         if ( this.INTERSECTED ) this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );
        //         this.INTERSECTED = intersects[ 0 ].object;
        //         this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();
        //         this.INTERSECTED.material.color.setHex( 0xff0000 );

        //     }
        // } else {

        //     if ( this.INTERSECTED ) this.INTERSECTED.material.color.setHex( this.INTERSECTED.currentHex );

        //     this.INTERSECTED = null;

        // }
    }
    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }
            
    }
}