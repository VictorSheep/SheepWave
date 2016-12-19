import {roundAt} from './utils';
import * as soundControler from './soundControler';

let list = [];
let notes = [];

// Remplissage du tableau notes (avec nom hauteur et frequence)
let noteName = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
let freq = Math.log(16.35001); // Do le plus bas
for (let i = 0; i < 9; i++) {

	for (let j = 0; j < noteName.length ; j++) {
		freq = Math.exp(freq);
		freq = (noteName[j]=='A' && freq>50)? roundAt(freq,0) : roundAt(freq,2);
		let oscillator = soundControler.ctx.createOscillator();
		oscillator.type = 'square';
		oscillator.frequency.value = freq; // value in hertz
		oscillator.start();
		let note = {
			name: noteName[j]+i,
			freq: freq,
			osc : oscillator
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
 * @return {number}	: fréquence de la note
 */
function getOscByName(note){
	for (var i = (note[note.length-1]*12); i < (note[note.length-1]*12)+12; i++) {
		if(notes[i].name == note) return notes[i].osc;
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
		list[i].draw(ctx);
	}
}
function playAll(){

}
export {
	soundControler,
	list,
	noteName,
	notes,
	getOscByName,
	getFreqByName,
	getNoteNameIndice,
	drawAll,
	playAll
};