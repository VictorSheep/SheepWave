import {drawCircle, getOscByName, roundAt} from './utils';

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
		// Objets créés par un musicCircle
		this.ephemeralEntityList = [];

		// on rempli les propriétés, si renseigné
		if (typeof arg == 'object') {
			for (let prop in arg){
				if(this[prop]) this[prop] = arg[prop];
			}
		}
	}	

	/**
	 * draw = dessine le musicCircle dans un canvas
	 * @param  {canvas} ctx : le context dans lequel on veut dessiner
	 * @return {nothing}
	 */
	draw(ctx){
		drawCircle(ctx,this.coord.x,this.coord.y,this.radius,this.color);
		setTimeout(()=>{
			this.radius += 1*this.animIndice;
			this.addAlpha(-0.03);
		},60);
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