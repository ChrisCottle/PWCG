function Game(windowWidth, windowHeight){
	this.innerWidth = windowWidth;
	this.innerHeight = windowHeight;
	
	//PIXI init
	this.renderer = PIXI.autoDetectRenderer(this.innerWidth,this.innerHeight);
	this.stage = new PIXI.Stage(0xa5e0c9);
	this.stage.setInteractive = true;
	
	//rules vars
	this.maxSelectedCards = 1;
	this.numSelectedCards = 0;
	this.cardMovementTimer = 1.0;

	//board needs dimensions of screen to determine render bounds
	this.currentBoard = new Board(windowWidth,windowHeight);
	
	//push to window
	document.body.appendChild(this.renderer.view);
}

//define methods for each instance of a Game
Game.prototype = {
	constructor: Game, 
	setMaxSelectedCards:function(given){
		this.maxSelectedCards = given;
	},
	setNumSelectedCards:function(given){
		this.numSelectedCards = given;
	},
	doStep:function(){
		var current = new Card("UnknownCard.png");
		this.stage.addChild(current.card);
	}
	
}