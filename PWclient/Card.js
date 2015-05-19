function Card(texturePath, width, xPos, yPos, rot){
	//pixi setup
	this.path = texturePath;
	this.texture = PIXI.Texture.fromImage(this.path);
	this.card = new PIXI.Sprite(this.texture);
	
	//rotation origin and dimensions
	//card height is determined by its width, so only width is passed
	this.card.width = width;
	this.card.height = width*1.5;
	this.card.anchor.x = 0.5;
	this.card.anchor.y = 1;
	this.card.position.x = xPos;
	this.card.originalX = xPos;
	this.card.position.y = yPos;
	this.card.originalY = yPos;
	this.card.originalW = this.card.width;
	this.card.originalH = this.card.height;
	this.card.expandedW = this.card.width*2;
	this.card.expandedH = this.card.height*2;
	this.card.rotation = rot;
	this.card.originalR = rot;
	this.card.cardHighlightBumpAmt = this.card.height/5;//cards should only bump up about 1/5 of their total size	
	
	// greensock interactivity
	this.card.buttonMode = true;
	this.card.interactive = true;
	this.isOver = false;
	this.card.isSelected = false;
}
//define methods for each instance of a Game
Card.prototype = {
	constructor: Card, 
}

