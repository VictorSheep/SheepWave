import Sketch from 'sketch-js';
import {drawCircle, drawRectangle} from './utils';
import MusicCircle from './MusicCircle.class';
import * as musicCircleManager from './musicCircleManager';

let count=4;
let refKeyControl=[1,2,3,4,5,6,7];
musicCircleManager.playStruct([1,2,1,2,1,3,1,3,4,2,4,2]);

export default Sketch.create({
    setup: function() {
        this.r = this.g = this.b = random( 100, 200 );
    },
    mousedown: function(e) {

        musicCircleManager.list.push(new MusicCircle({
            color   : '#139AAE',
            radius  : 80,
            coord:{
                x: e.clientX,
                y: e.clientY
            },
            variation   : 'majeur',
            keynote     : 'E',
            key         : count,
            refKeyControl: refKeyControl
        }));

        count = 2;
        refKeyControl = [3,5];
    },
    draw: function() {
        // couleur de fond
        drawRectangle(this,0,0,this.width,this.height,'#120E0A');
        // les différents musicCircle
        musicCircleManager.drawAll(this);
    }
});