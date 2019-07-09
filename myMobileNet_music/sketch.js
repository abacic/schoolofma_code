
// this will hold the model
let myMobileNet;
let myVideo;
let myDiv;
let osc;
let notes = [ 60, 62, 64, 65, 67, 69, 71];




// this is calling the image classifier and giving it a name
function preload() {
	myMobileNet = ml5.imageClassifier('MobileNet'); //put name of model here
    myVideo = createCapture(VIDEO);
}


function setup() {
	 myMobileNet.classify(myVideo, gotResults);
 // this code retains it in one sentence rather than running writing  if the '...' was not there
	 myDiv = createDiv('...');
	 myDiv.parent('#wrapper');

	  // A triangle oscillator
	  osc = new p5.TriOsc();
	  // Start silent
	  osc.start();
	  osc.amp(0);
	  // second number below is the duration of the sound
	  // playNote(64, 10000);
}


// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we set a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

// Activate audio when we click on screen
function mousePressed(event) {
	// number below chooses the pitch of the note played
    playNote(62);
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}


function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    // console.log(results);
    myDiv.html(`Music model with video prediction as: ${results[0].label}, Confidence: ${results[0].confidence} click video to play sound`);
    setTimeout(() => myMobileNet.classify(myVideo, gotResults), 1000);
  }
}