function Game(windowWidth, windowHeight){
	this.innerWidth = windowWidth;
	this.innerHeight = windowHeight;
	
	//PIXI init
	this.renderer = PIXI.autoDetectRenderer(this.innerWidth,this.innerHeight);
	this.stage = new PIXI.Stage(0xa5e0c9);
	
	//board needs dimensions of screen to determine render bounds
	this.currentBoard = new Board(windowWidth,windowHeight);
	
	//rules vars
	this.maxSelectedCards = 1;
	this.numSelectedCards = 0;
	this.cardMovementTimer = 1.0;
}

function DoStep(){
	
}