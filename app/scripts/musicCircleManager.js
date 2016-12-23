import {roundAt, chance} from './utils';
import * as soundControler from './soundControler';

let list = [];
let notes = [];
let beat = 0;

let played = false;

// Remplissage du tableau notes (avec nom hauteur et frequence)
let noteName = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
let freq = Math.log(16.35001); // Do le plus bas
for (let i = 0; i < 9; i++) {

	for (let j = 0; j < noteName.length ; j++) {
		freq = Math.exp(freq);
		freq = (noteName[j]=='A' && freq>50)? roundAt(freq,0) : roundAt(freq,2);

		let squareOsc = soundControler.ctx.createOscillator();
		squareOsc.type = 'square';
		squareOsc.frequency.value = freq; // value in hertz
		squareOsc.start();

		let sineOsc = soundControler.ctx.createOscillator();
		sineOsc.type = 'square';
		sineOsc.frequency.value = freq; // value in hertz
		sineOsc.start();

		let note = {
			name: noteName[j]+i,
			freq: freq,
			squareOsc 	: squareOsc,
			sineOsc 	: sineOsc
		};
		notes.push(note);
		freq = Math.log(freq);
		// différence entre deux demi-ton
		freq += Math.log(17.32229)-Math.log(16.35001);
	}
}

/**
 * getFreqByName : Récupère la fréquence d'une note en fonction de son nom
 * @param  {string} note : Nom anglais de la note avec sa hauteur
 * @param  {string} type : forme du signal (square,sine)
 * 
 * @return {number}	: fréquence de la note
 */
function getOscByName(note,type='square'){
	for (var i = (note[note.length-1]*12); i < (note[note.length-1]*12)+12; i++) {
		
		if(notes[i].name == note){
			
			switch (type){
				case 'square'	: return notes[i].squareOsc;
				case 'sine'		: return notes[i].sineOsc;
				default: break;
			}
		}
	}
}
function getFreqByName(note){
	for (var i = (note[note.length-1]*12); i < (note[note.length-1]*12)+12; i++) {
		if(notes[i].name == note) return notes[i].freq;
	}
}
function getNoteNameIndice(note){
	for (var i = 0; i < noteName.length; i++) {
		if(noteName[i] == note) return i;
	}
}
/**
 * drawAll 	: Dessine tous les musicCircle sur le canvas
 * @param  {context} ctx : Context dans lequel dessiner 
 * @return {nothing}
 */
function drawAll(ctx){
	for (var i = list.length - 1; i >= 0; i--) {
		list[i].drawAll(ctx);
	}
}

/**
 * playAllRand : 	Joue une note random de chaque instance de MusicCircle
 * 					en boulce, avec la fondamental sur chaque mesure
 * @return {nothing}
 */
function playAllRand(notesNb=null){
	setInterval(()=>{
		for (var i = list.length - 1; i >= 0; i--) {
			if(!notesNb) notesNb = list[i].refKeyControl;

			let keyRand = notesNb[Math.floor(Math.random()*notesNb.length)];
			if(beat===0){
				if(chance(90)) list[i].play(1,150);
			}else{
				if(chance(50)) list[i].play(keyRand,130);
			}
		}
		beat ++;
		beat = beat%4;
	}, 200);		
}

/**
 * playStruct : 
 * @param  {Array}  struct [description]
 * @param  {Number} rep    [description]
 * @return {[type]}        [description]
 */
function playStruct(struct=[1,2],rep=2){

	let j = 0;
	let nbpart;
	let beat = 0;
	let measure = 0;

	setInterval(()=>{

		for (var i = 0; i < list.length; i++) {
			played = true;
			// préparation des données
			j = j % struct.length;
			nbpart = struct[j]-1;
			beat = beat % list[i].part[nbpart].length;

			// Lecture de la note
			list[i].play(list[i].part[nbpart][beat],110);

			// préparation des données pour incrémentation
		}

		// incrémentation des valeurs
		if (played){
			beat ++;
			if (beat%list[0].part[nbpart].length === 0){
				measure++;
				if (measure % rep === 0) j++;
			}
		}


	},210);

}

export {
	list,
	noteName,
	notes,
	getOscByName,
	getFreqByName,
	getNoteNameIndice,
	drawAll,
	playAllRand,
	playStruct
};