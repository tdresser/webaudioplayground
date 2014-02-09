var ac = new webkitAudioContext();
var time = 0;

var processor = ac.createScriptProcessor(4096, 1, 1);
var analyser = ac.createAnalyser();

navigator.webkitGetUserMedia({audio : true}, onSuccess, onFailure);

function onSuccess(stream) {
    var microphone = ac.createMediaStreamSource(stream);
    microphone.connect(processor);
    processor.connect(analyser);
    analyser.connect(ac.destination);
    console.log("Got microphone");
}

function onFailure(e) {
    console.log("Awwww, nuts.");
    console.log(e);
}

processor.onaudioprocess = function(e) {
    var inputBuffer = e.inputBuffer.getChannelData(0);
    var outputBuffer = e.outputBuffer.getChannelData(0);
    var length = outputBuffer.length;
    for(var i = 0; i < length; ++i) {
        outputBuffer[i] = getSample(inputBuffer[i], time);
	time += 1 / ac.sampleRate;
    }
    drawBuffer(time, outputBuffer);
    drawAnalysis(analyser);
}
