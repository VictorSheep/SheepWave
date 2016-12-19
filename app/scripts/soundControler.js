window.AudioContext = window.AudioContext || window.webkitAudioContext;

let ctx = new AudioContext();
let analyser = ctx.createAnalyser();
let filter = ctx.createBiquadFilter();
let gainNode = ctx.createGain();

function play(osc){
	osc.connect(ctx.destination);
}
function stop(osc){
	osc.disconnect();
}

export {
	ctx,
	analyser,
	filter,
	gainNode,
	play,
	stop
};