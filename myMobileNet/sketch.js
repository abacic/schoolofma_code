
// this will hold the model
let myMobileNet;
let myImg;

// this is calling the image classifier and giving it a name
function preload() {
	myMobileNet = ml5.imageClassifier('MobileNet');
	myImg = loadImage('./myAnimal.jpg');

}

//
function setup() {
	 myMobileNet.classify(myImg, gotResults);
}

function gotResults(err, results) {
	if (err) console.log(err);
	if (results) {
		console.log(results);
		createDiv(`${results[0].label} ${results[0].confidence}`);
	}

}