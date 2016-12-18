window.AudioContext = window.AudioContext || window.webkitAudioContext;

export default class {
	constructor(arg){
		this.ctx = new AudioContext();
		this.analyser = this.ctx.createAnalyser();
		this.filter = this.ctx.createBiquadFilter();
		this.gainNode = this.ctx.createGain();


		// Modification des propriétés par défaut, si renseigné
		if (typeof arg == 'object') {
			for (let prop in arg){
				if(this[prop]) this[prop] = arg[prop];
			}
		}
	}

	play(osc){
		osc.connect(this.ctx.destination);
	}
	stop(osc){
		osc.disconnect();
	}
}