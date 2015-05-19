//http://stackoverflow.com/questions/18582150/external-javascript-calling-functions-from-another-external-javascript-file
function Hand(handSize, anchorX, anchorY, id){
	this.handSize = handSize;
	this.handRotationFactor = 0.1;
	this.hand = [];
	this.handSpacing = 30;
	this.handAnchorX = anchorX-(this.handSpacing*this.handSize)/2;
	this.handAnchorY = anchorY;
	this.id = id;
	//window.alert("Anchor x is: " +this.handAnchorX);
	
}

Hand.prototype = {
	constructor: Hand, 
	splayHand:function(){
		//var current = new Card("UnknownCard.png", 150, handAnchorX+(0-(handSize/2))+(handSpacing*0), handAnchorY, (0-(handSize/2))*handRotationFactor);
		//card = current.card;
		//currentGame.stage.addChild(card);
		
		for(var i = 0; i<this.handSize; i++){
			
			//card.position.x = handAnchorX+(i-(handSize/2))+(handSpacing*i); //cards are at the xPos provided by handAnchorX. handSize/2 defines the card that will be on that position, each card before that card is progressively further left, etc...
			//cards should be rotated in a fan shape 
			//ie: left and right most cards are rotated most extreme, middle card is perfectly vertical (0 rot)
			//handSize/2 should be 0 rotation, so whatever distance this card from the middle is should be its rotation
			//card.rotation = (i-(handSize/2))*handRotationFactor;
			var current = new Card("UnknownCard.png", currentGame.innerWidth/10, this.handAnchorX+(i-(this.handSize/2))+(this.handSpacing*i), this.handAnchorY, (i-(this.handSize/2))*this.handRotationFactor);
			card = current.card;
			hand[i] = card;
			card.handPos = i;
			card.handId = this.id;
			//attach card funcs
			
			//mouseover provides the user feedback that they could potentially interact with this card
			card.mouseover = function(data){
				var item = this;
				if(!item.isSelected){
					item.isOver = true;
					var bumpPosY = item.position.y - item.cardHighlightBumpAmt;
					var bumpPosX = item.position.x - item.rotation*-item.cardHighlightBumpAmt;
					TweenMax.to(item, currentGame.cardMovementTimer, {y:bumpPosY});
					TweenMax.to(item, currentGame.cardMovementTimer, {x:bumpPosX});
				}
			};
			
			//mouseout provides feedback that this card is no longer interactable
			card.mouseout = function(data){
				var item = this;
				if(!item.isSelected){
					item.isOver = false;
					TweenMax.to(item, currentGame.cardMovementTimer, {y:item.originalY});
					TweenMax.to(item, currentGame.cardMovementTimer, {x:item.originalX});
				}
			};
			
			//clicking on a card should bring it into full view for more info
			card.click = function(data){
				var item = this;
				//only move the card to the selection area if it hasn't been selected before
				if((!item.isSelected) && (currentGame.numSelectedCards < currentGame.maxSelectedCards)){
					TweenMax.to(item, currentGame.cardMovementTimer, {x:currentGame.currentBoard.selectionAnchorX});
					TweenMax.to(item, currentGame.cardMovementTimer, {y:currentGame.currentBoard.selectionAnchorY});
					TweenMax.to(item, currentGame.cardMovementTimer, {width:item.expandedW});
					TweenMax.to(item, currentGame.cardMovementTimer, {height:item.expandedH});
					TweenMax.to(item, currentGame.cardMovementTimer, {rotation:0});
					item.isSelected = true;//this item is now selected
					currentGame.numSelectedCards++;
				}
				else if(item.isSelected){
					TweenMax.to(item, currentGame.cardMovementTimer, {x:item.originalX});
					TweenMax.to(item, currentGame.cardMovementTimer, {y:item.originalY});
					TweenMax.to(item, currentGame.cardMovementTimer, {width:item.originalW});
					TweenMax.to(item, currentGame.cardMovementTimer, {height:item.originalH});
					TweenMax.to(item, currentGame.cardMovementTimer, {rotation:item.originalR});
					item.isSelected = false;//this item is now selected
					currentGame.numSelectedCards--;
				}
				window.alert("You clicked card " + item.handPos + " in hand: " + item.handId);
			};
			
			currentGame.stage.addChild(card);
		}
		
	}
}