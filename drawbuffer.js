var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawBuffer(time, buffer) {
    var length = buffer.length / 4;
    var x_delta = canvas.width / length;

    ctx.clearRect (0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (var i = 0; i < length; ++i)
    	ctx.lineTo(i * x_delta, canvas.height / 2 - buffer[i] * canvas.height / 3);
    ctx.stroke();
}

// Make sure that we draw things correctly when the window has been resized.

window.onresize=function(){
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;
};

window.onresize();

// Draw the frequency analysis on the left hand size.

var fftData = null;

function drawAnalysis(analyser) {
    if (fftData === null)
	fftData = new Float32Array(analyser.frequencyBinCount);
    var max_freq = 200;
    var y_delta = canvas.height / max_freq;
    var scale = analyser.maxDecibels - analyser.minDecibels;
    analyser.getFloatFrequencyData(fftData);

    for (var i = 0; i < max_freq; ++i) {
	var value = (fftData[i] - analyser.minDecibels) / scale * 200;
	value = Math.round(value);
	var y = canvas.height - Math.round(i * y_delta);
	ctx.fillStyle="rgb(" + value + "," + value + "," + 100 + ")";
	ctx.fillRect(0, y - Math.ceil(y_delta),
		    100, Math.ceil(y_delta));
    }
}
