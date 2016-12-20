import {drawCircle, getOscByName, chance, roundAt} from './utils';
import * as manager from './musicCircleManager';
import * as soundControler from './soundControler';
import EphemeralWave from './EphemeralWave.class';

export default class { 
	constructor(arg){
		// Carracteristiques visuelles
		this.color 	= 'rgba(255,255,255,1)';
		this.radius = 50;
		this.coord 	= {
			x: 0,
			y: 0
		};
		this.isHover 	= false;
		this.alpha 		= 1;
		// Objets créés par un musicCircle
		this.ephemeralWaveList = [];

		// Carracteristiques sonores
		this.variation 	= 'majeur'; 	// mode
		this.keynote 	= 'C';			// tonique
		this.intervals	= [2,2,1,2,2,2];
		this.noteName	= [];
		this.notePlayed = null;
		this.lastNotePlayed = '';
		this.key 		= '4';
		this.beat		= 0;

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
		for (var i = 0 ; i <= this.intervals.length; i++) {
			this.noteName[i] = manager.noteName[j%12];
			j += this.intervals[i];
		}

		this.playRand();
	}

	update(){
		for (var i = this.ephemeralWaveList.length - 1; i >= 0; i--) {
			if(this.ephemeralWaveList[i].opacity <= 0){
				this.ephemeralWaveList.splice(i,1);
			}
		}
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
		this.update();
	}
	drawEphemeralWave(ctx){
		for (var i = this.ephemeralWaveList.length - 1; i >= 0; i--) {
			this.ephemeralWaveList[i].draw(ctx);
			this.ephemeralWaveList[i].update();
		}
	}
	drawAll(ctx){
		this.draw(ctx);
		this.drawEphemeralWave(ctx);
	}

	/**
	 * play : Joue une note
	 * @param  {int} noteNb 	: numero de la note sur la gamme (de 1 à 7)
	 * @param  {int} time   	: durrée de la note
	 * @param  {int} delay  	: délait avant lecture de la note
	 * @return {nothing}
	 */
	play(noteNb,time,delay=0){
		noteNb--;
		setTimeout(()=>{
			this.notePlayed = ''+this.noteName[noteNb]+this.key;
			let osc = manager.getOscByName(this.notePlayed);
			soundControler.play(osc);
			this.ephemeralWaveList.push(new EphemeralWave({
				coord:this.coord,
				radius:this.radius,
				animIndice:2
			}));
			setTimeout(()=>{
				soundControler.stop(osc);
				this.lastNotePlayed = this.noteName[noteNb]+this.key;
			},time);
		},delay);
	}

	playRand(){
		let keyRand=1;
		setInterval(()=>{
			keyRand = Math.round(Math.random()*6+1);
			console.log(keyRand);
			if(this.beat==0){
				if(chance(90)) this.play(1,100);
			}else{
				if(chance(50)) this.play(keyRand,90);
			}
			this.beat ++;
			this.beat = this.beat%4;
		},150);
	}

}