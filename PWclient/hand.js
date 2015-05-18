//http://stackoverflow.com/questions/18582150/external-javascript-calling-functions-from-another-external-javascript-file
function Hand(handSize, anchorX, anchorY){
	this.handSize = handSize;
	this.handRotationFactor = 0.1;
	this.hand = [];
	this.handSpacing = 30;
	this.handAnchorX = anchorX-(this.handSpacing*this.handSize)/2;
	this.handAnchorY = anchorY;
	window.alert("Anchor x is: " +this.handAnchorX);
}

Hand.prototype = {
	constructor: Hand, 
}