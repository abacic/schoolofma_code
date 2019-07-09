
// this will hold the model
let myMobileNet;
let myVideo;
let myDiv;


// this is calling the image classifier and giving it a name
function preload() {
	myMobileNet = ml5.imageClassifier('MobileNet'); //put name of model here
    myVideo = createCapture(VIDEO);
 
}


function setup() {
	 myMobileNet.classify(myVideo, gotResults);
// this code retains it in one sentence rather than running writing vertically if the '...' was not there
	 myDiv = createDiv('...');
	 myDiv.parent('#wrapper');
}

function gotResults(err, results) {
	if (err) console.log(err);
	if (results) {
//		console.log(results);
		myDiv.html(`The MobileNet model labelled this as: ${results[0].label}, with a confidence of ${results[0].confidence}`);
		myMobileNet.classify(myVideo, gotResults);
// this code slows down the recurrence of the results down to 1 second, 1000 milliseconds		
		setTimeout(() => myMobileNet.classify(myVideo, gotResults), 1000);

	}

}