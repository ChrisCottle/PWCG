function Board(innerWidth,innerHeight){
	//board needs: Drawpile, hand, oppenent hand, gameState
	
	//this will have to use the deck's hand spacing;
	this.handAnchorX = (innerWidth/2)-(handSpacing*handSize)/2;
	this.handAnchorY = (yHeight/3)*2.7;
	
	//location of selected card ofr inspection (relative middle of the screen)
	var selectionAnchorX = xWidth/2;
	var selectionAnchorY = yHeight/1.5;
}