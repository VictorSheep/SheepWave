import {drawCircle, roundAt} from './utils';
import SoundControler from './SoundControler.class';
import * as manager from './musicCircleManager';

let soundControler = new SoundControler();

export default class { 
	constructor(arg){
		// Carracteristiques visuelles
		this.color 	= '#fff';
		this.radius = 50;
		this.coord 	= {
			x: 0,
			y: 0
		};
		this.isHover 	= false;
		this.alpha 		= 1;

		// Carracteristiques sonores
		this.variation 	= 'majeur'; 	// mode
		this.keynote 	= 'C1';			// tonique
		this.noteName	= ['C1','D1','E1','F1','G1','A1','B1'];
		this.oscillator = soundControler.ctx.createOscillator();
		this.oscillator.type = 'square';
		this.oscillator.frequency.value = 440;

		// on rempli les propriétés, si renseigné
		if (typeof arg == 'object') {
			for (let prop in arg){
				if(this[prop]) this[prop] = arg[prop];
			}
		}

		this.playTon(200);		
	}

	setOscFreq(val){ this.oscillator.frequency.value = val; }

	/**
	 * draw = dessine le musicCircle dans un canvas
	 * @param  {canvas} ctx : le context dans lequel on veut dessiner
	 * @return {nothing}
	 */
	draw(ctx){
		drawCircle(ctx,this.coord.x,this.coord.y,this.radius,this.color);
	}

	/**
	 * playTon : Joue la tonnale
	 * @param  {int} time : durée de la note en ms
	 * @return {nothing}
	 */
	playTon(time){
		this.oscillator.frequency.value = manager.getFreqByName(this.keynote);
		soundControler.play(this.oscillator);
		setTimeout(()=>{
			soundControler.stop(this.oscillator);
		},time);
	}

}