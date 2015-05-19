function Board(innerWidth,innerHeight){
	//board needs: Drawpile, hand, oppenent hand, gameState
	this.selectionAnchorX = innerWidth/2;
	this.selectionAnchorY = innerHeight/1.5;
	//add your hand to this board
	
}

//define methods for each instance of a Game
Board.prototype = {
	constructor: Board, 
	buildSpace:function(){
	}
}