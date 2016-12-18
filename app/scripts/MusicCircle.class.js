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
		this.keynote 	= 'C';			// tonique
		this.intervals	= [2,2,1,2,2,2];
		this.noteName	= ['C','D','E','F','G','A','B'];
		this.notePlayed = null;
		this.lastNotePlayed = '';
		this.key 		= 4;
		this.oscillator = soundControler.ctx.createOscillator();
		this.oscillator.type = 'triangle';
		this.oscillator.frequency.value = 440;

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
		console.log(this.keynote);
		let j = manager.getNoteNameIndice(this.keynote);
		for (var i = 0 ; i < this.intervals.length; i++) {
			this.noteName[i] = manager.noteName[j%12];
			j += this.intervals[i];
		}
		console.log(this.noteName);
		this.playTon(200);		
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
	 * playTon : Joue la tonnale
	 * @param  {int} time : durée de la note en ms
	 * @return {nothing}
	 */
	playTon(time,delay=0){
		this.notePlayed = this.keynote+this.key;
		this.oscillator.frequency.value = manager.getFreqByName(this.notePlayed);
		setTimeout(()=>{
			soundControler.play(this.oscillator);
			setTimeout(()=>{
				soundControler.stop(this.oscillator);
				this.notePlayed = null;
				this.lastNotePlayed = this.keynote+this.key;
			},time);
		},delay);
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
		this.notePlayed = this.noteName[noteNb]+this.key;
		this.oscillator.frequency.value = manager.getFreqByName(this.notePlayed);
		soundControler.play(this.oscillator);
		setTimeout(()=>{
			soundControler.stop(this.oscillator);
		},time);
	}

}