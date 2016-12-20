import * as sketchCtx from './sketchCtx';

function drawCircle(ctx,x,y,r,color){
	ctx.beginPath();
	ctx.lineWidth="2";
	ctx.arc(x, y, r, 0, Math.PI*2);
	ctx.strokeStyle = color;
	ctx.stroke();
}
function drawRectangle(ctx,x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect( x, y, w, h);
}

/**
 * roundAt : arrondi un chiffre après la virgule
 * @param  {number} nb : chiffre à arrondir
 * @param  {int} 	i  : nombre de chiffre après la virgule
 * @return {number} : nombre arrondi
 */
function roundAt(nb,i){
	if (i === 0) return Math.round(nb);

	let pow = Math.pow(10,i);
	let result = nb;

	result = result*pow;
	result = Math.round(result);
	result = result/pow;

	return result;
}

/**
 * chance
 * @param  {int} 	nb : entier de 0 à 100
 * @return {bool}
 */
function chance(nb){
	if(Math.round(Math.random()*100)<nb){
		return true;
	}else{
		return false;
	}
}

/**
 * takeOffSign : Hote le signe d'un chiffre
 * @param  {number} nb : Chiffre dont on veut hoter le signe
 * @return {number} : Chiffre positif
 */
function takeOffSign(nb){
	let result = Math.sqrt(Math.pow(nb,2));

	return result;
}

export {drawCircle, drawRectangle, roundAt, chance, takeOffSign};