
		//stage init
		var xWidth = window.innerWidth;
		var yHeight = window.innerHeight;
		var stage = new PIXI.Stage(0xe5e0c9);
		var renderer = PIXI.autoDetectRenderer(xWidth,yHeight);
		var handSize = 9.0; //floating point for hand rotation calculation
		var cardMovementTimer = 0.4; //how fast to slide cards around
		//hand init and vars
		var myHand = []; // cards in this player's hand
		var handSpacing = 30; //space between cards in hand before rotation
		var handRotationFactor = 0.1; //rotation amount seems to be 10x more than intended
		var cardHighlightBumpAmt = yHeight/25;//to be reassigned when cards are delt
		var maxSelectedCards = new hand(2);
		var numSelectedCards = 0;
		
		//define the place on the screen where the player's "hand is located"
		var handAnchorX = (xWidth/2)-(handSpacing*handSize)/2; //center at half of the screen, scoot left by the number of cards that are in the hand (the space between these cards)
		var handAnchorY = (yHeight/3)*2.7;
		
		//define anchor for selected cards
		var selectionAnchorX = xWidth/2;
		var selectionAnchorY = yHeight/1.5;
		//define card properties
		var uCardTex = PIXI.Texture.fromImage("UnknownCard.png");
		
		
		stage.setInteractive = true;
		document.body.appendChild(renderer.view);
		requestAnimFrame(animate);
		
		
		//hand loop (creation, selection, placement)
		for(var i = 0; i<handSize; i++){
			//card config
			var card = new PIXI.Sprite(uCardTex);
			card.width = card.width/2;
			card.height = card.height/2;
			card.isSelected = false;
			card.buttonMode = true;
			card.interactive = true;
			//sets the rot point for the card to be the bottom middle
			card.anchor.x = 0.5;
			card.anchor.y = 1;
			//base put the card down where the hand position is, separate them by a certain amount
			card.position.x = handAnchorX+(i-(handSize/2))+(handSpacing*i); //cards are at the xPos provided by handAnchorX. handSize/2 defines the card that will be on that position, each card before that card is progressively further left, etc...
			card.position.y = handAnchorY;
			
			//cards should be rotated in a fan shape 
			//ie: left and right most cards are rotated most extreme, middle card is verticle
			//handSize/2 should be 0 rotation, so whatever distance this card from the middle is should be its rotation
			card.rotation = (i-(handSize/2))*handRotationFactor;
			
			//fields to hold these values (so that cards can return to these between selection/hovering)
			card.originalX = card.position.x;
			card.originalY = card.position.y;
			card.originalW = card.width;
			card.originalH = card.height;
			card.expandedW = card.width*2;
			card.expandedH = card.height*2;
			card.originalR = card.rotation;
			cardHighlightBumpAmt = card.height/5;//cards should only bump up about 1/5 of their total size
			
			
			//card funcs
			card.mouseover = function(data){
				var item = this;
				if(!item.isSelected){
					item.isOver = true;
					var bumpPosY = item.position.y - cardHighlightBumpAmt;
					var bumpPosX = item.position.x - item.rotation*-cardHighlightBumpAmt;
					TweenMax.to(item, cardMovementTimer, {y:bumpPosY});
					TweenMax.to(item, cardMovementTimer, {x:bumpPosX});
				}
			};
			card.mouseout = function(data){
				var item = this;
				if(!item.isSelected){
					item.isOver = false;
					TweenMax.to(item, cardMovementTimer, {y:item.originalY});
					TweenMax.to(item, cardMovementTimer, {x:item.originalX});
				}
			};
			card.mousedown = function(data){
				var item = this;
				//only move the card to the selection area if it hasn't been selected before
				if((!item.isSelected) && (numSelectedCards < maxSelectedCards)){
					TweenMax.to(item, cardMovementTimer, {x:selectionAnchorX});
					TweenMax.to(item, cardMovementTimer, {y:selectionAnchorY});
					TweenMax.to(item, cardMovementTimer, {width:item.expandedW});
					TweenMax.to(item, cardMovementTimer, {height:item.expandedH});
					TweenMax.to(item, cardMovementTimer, {rotation:0});
					item.isSelected = true;//this item is now selected
					numSelectedCards++;
				}
				else if(item.isSelected){
					TweenMax.to(item, cardMovementTimer, {x:item.originalX});
					TweenMax.to(item, cardMovementTimer, {y:item.originalY});
					TweenMax.to(item, cardMovementTimer, {width:item.originalW});
					TweenMax.to(item, cardMovementTimer, {height:item.originalH});
					TweenMax.to(item, cardMovementTimer, {rotation:item.originalR});
					item.isSelected = false;//this item is now selected
					numSelectedCards--;
				}
			};
			
			stage.addChild(card);
		}
		
		function animate(){
			requestAnimFrame(animate);
			//card.rotation +=0.01;
			renderer.render(stage);
		}