import * as dat from 'lil-gui'

export default class Debug
{
    constructor()
    {

        // this.active = window.location.hash === '#debug'
        // always using dat.gui for presentation
        this.active = true

        if(this.active)
        {
            this.ui = new dat.GUI()
        }
    }
}