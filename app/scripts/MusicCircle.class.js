import {drawCircle, getOscByName, roundAt} from './utils';
import * as manager from './musicCircleManager';

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
		this.keynote 	= 'C';			// tonique
		this.intervals	= [2,2,1,2,2,2];
		this.noteName	= [];
		this.notePlayed = null;
		this.lastNotePlayed = '';
		this.key 		= '4';

		// on rempli les propriétés, si renseigné
		if (typeof arg == 'object') {
			for (let prop in arg){
				if(this[prop]) this[prop] = arg[prop];
			}
		}

		// Calcul de la gamme utilisé en fonction du mode et de la tonnique
		// Definition des intervals fonction du mode
		switch(this.variation){
			case 'majeur':
			case 'major':
				this.intervals = [2,2,1,2,2,2];
				break;

			case 'mineur':
			case 'minor':
				this.intervals = [2,1,2,2,2,2];
				break;
		}
		// Remplissage du tableau noteName[] avec pour première note: la tonnique
		let j = manager.getNoteNameIndice(this.keynote);
		for (var i = 0 ; i < this.intervals.length; i++) {
			this.noteName[i] = manager.noteName[j%12];
			j += this.intervals[i];
		}

		this.play(1,70);
		this.play(3,70,110);
		this.play(5,70,220);
	}	

	setOscType(val){ this.oscillator.type = val; }
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
	 * play : Joue une note
	 * @param  {int} noteNb 	: numero de la note sur la gamme (de 1 à 7)
	 * @param  {[type]} time   [description]
	 * @param  {Number} delay  [description]
	 * @return {[type]}        [description]
	 */
	play(noteNb,time,delay=0){
		noteNb--;
		setTimeout(()=>{
			this.notePlayed = ''+this.noteName[noteNb]+this.key;
			let osc = manager.getOscByName(this.notePlayed);
			manager.soundControler.play(osc);
			setTimeout(()=>{
				manager.soundControler.stop(osc);
				this.lastNotePlayed = this.noteName[noteNb]+this.key;
			},time);
		},delay);
	}

}