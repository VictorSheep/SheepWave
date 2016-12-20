import {drawCircle, getOscByName, roundAt, takeOffSign} from './utils';

export default class {
	constructor(arg){
		// Carracteristiques visuelles
		this.color 	= 'rgba(255,255,255,1)';
		this.alpha 	= 1;
		this.radius = 50;
		this.coord 	= {
			x: 0,
			y: 0
		};
		// Carracteristiques d'animations
		this.animIndice = 1;
		// Liste d'instance d'EphemeralWave
		this.ephemeralEntityList = [];

		// on rempli les propriétés, si renseigné
		if (typeof arg == 'object') {
			for (let prop in arg){
				if(this[prop]) this[prop] = arg[prop];
			}
		}
	}

	update(){
		this.radius += 1*this.animIndice;
		this.addAlpha(-0.03*takeOffSign(this.animIndice/3));
	}

	/**
	 * draw = dessine le musicCircle dans un canvas
	 * @param  {canvas} ctx : le context dans lequel on veut dessiner
	 * @return {nothing}
	 */
	draw(ctx){
		drawCircle(ctx,this.coord.x,this.coord.y,this.radius,this.color);
	}

	addAlpha(val){
		this.alpha+=val;
		this.updateColor();
	}
	setAlpha(val){
		this.alpha=val;
		this.updateColor();
	}

	updateColor(){
		this.color = 'rgba(255,255,255,'+this.alpha+')';
	}
}