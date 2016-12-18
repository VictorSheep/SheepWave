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

function roundAt(nb,i){
	if (i === 0) return Math.round(nb);

	let pow = Math.pow(10,i);
	let result = nb;

	result = result*pow;
	result = Math.round(result);
	result = result/pow;

	return result;
}

export {drawCircle, drawRectangle, roundAt};