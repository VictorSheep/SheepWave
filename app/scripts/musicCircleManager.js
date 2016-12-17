import {roundAt} from './utils';

let list = [];
let notes = [];

// Remplissage du tableau notes (avec nom hauteur et frequence)
let noteName = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
let freq = Math.log(16.35001); // Do le plus bas
for (let i = 0; i < 9; i++) {

	for (let j = 0; j < noteName.length ; j++) {
		freq = Math.exp(freq);
		freq = (noteName[j]=='A' && freq>50)? roundAt(freq,0) : roundAt(freq,2);
		let note = {
			name: noteName[j]+i,
			freq: freq
		};
		notes.push(note);
		freq = Math.log(freq);
		// différence entre deux demi-ton
		freq += Math.log(17.32229)-Math.log(16.35001);
	}
}

function getFreqByName(note){
	for (var i = (note[note.length-1]*12); i < (note[note.length-1]*12)+12; i++) {
		if(notes[i].name == note) return notes[i].freq;
	}
}

function drawAll(ctx){
	for (var i = list.length - 1; i >= 0; i--) {
		list[i].draw(ctx);
	}
}
function playAll(){

}
export {list, notes, getFreqByName, drawAll, playAll};