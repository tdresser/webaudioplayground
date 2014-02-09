var ac = new webkitAudioContext();
var time = 0;

var processor = ac.createScriptProcessor(4096, 1, 1);
var analyser = ac.createAnalyser();
processor.connect(analyser);
analyser.connect(ac.destination);

processor.onaudioprocess = function(e) {
    var buffer = e.outputBuffer.getChannelData(0);
    var length = buffer.length;
    for(var i = 0; i < length; ++i) {
        buffer[i] = getSample(time);
	time += 1 / ac.sampleRate;
    }
    drawBuffer(time, buffer);
    drawAnalysis(analyser);
}
