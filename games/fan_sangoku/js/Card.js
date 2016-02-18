function Card(name,w,h,t){
	var s = this;
	base(s,LSprite,[]);
	
	s.name = name;
	s.gameStage = null;
	s.mode = "close";
	s.otherOpenCard = null;
	
	s._cardWidth = w;
	s._cardHeight = h;
	s.stayTime = t;
	s.stayTimer = 0;
	s.duration = 1.5;
	
	s.backStyle = new LBitmapData(datalist["card_back"]);
	s.openStyle = new LBitmapData(datalist[name]);
	
	s.closeCardObj = new LBitmap(s.backStyle);
	s.closeCardObj.x = 10;
	s.closeCardObj.y = 12;
	s.closeCardObj.scaleX = (s._cardWidth-10)/s.closeCardObj.getWidth();
	s.closeCardObj.scaleY = (s._cardHeight-20)/s.closeCardObj.getHeight();
	s.addChild(s.closeCardObj);
	
	s.openCardBack = new LBitmap(new LBitmapData(datalist["common_widget"],114,368,113,113));
	s.openCardBack.visible = false;
	s.openCardBack.x = 10;
	s.openCardBack.y = 12;
	s.openCardBack.scaleX = (s._cardWidth-10)/s.openCardBack.getWidth();
	s.openCardBack.scaleY = (s._cardHeight-20)/s.openCardBack.getHeight();
	s.addChild(s.openCardBack);
	
	s.openCardObj = new LBitmap(s.openStyle);
	s.openCardObj.visible = false;
	s.openCardObj.x = 10;
	s.openCardObj.y = 12;
	s.openCardObj.scaleX = (s._cardWidth-10)/s.openCardObj.getWidth();
	s.openCardObj.scaleY = (s._cardHeight-20)/s.openCardObj.getHeight();
	s.addChild(s.openCardObj);
	
	var borderBitmapData = new LBitmapData(datalist["common_widget"],0,368,113,115);
	s.border = new LBitmap(borderBitmapData);
	s.addChild(s.border);
	
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
}
Card.prototype.initCard = function(){
	this.gameStage = this.parent.parent;
};
Card.prototype.onframe = function(event){
	var s = event.target;
	if(s.mode == "opening" || s.mode == "close" || s.mode == "closing" || s.mode == "destroy")return;
	s.stayTimer += 1;
	if(s.stayTimer >= s.stayTime){
		if(s.gameStage.clickTargetList.length < 2){
			s.closeCard();
			s.stayTimer = 0;
		}else{
			s.getOtherOpenCard();
			if(s.otherOpenCard.mode == "open"){
				s.closeCard();
			}
		}
	}
};
Card.prototype.getOtherOpenCard = function(){
	var s = this;
	var l = s.gameStage.clickTargetList;
	for(var key=0; key<l.length; key++){
		var o = l[key];
		if(s.objectIndex != o.objectIndex){
			s.otherOpenCard = o;
			break;
		}
	}
};
Card.prototype.closeCard = function(){
	var s = this;
	var isChangeDir = false;
	if(s.gameStage.lock == true)return;
	Scale3D.to(s,s.duration,{
		scaleX:1,
		isBack:false,
		onStart:function(){
			s.mode = "closing";
			s.otherOpenCard = null;
			s.stayTimer = 0;
			var l = s.gameStage.clickTargetList;
			for(var key=0; key<l.length; key++){
				var o = l[key];
				if(s.objectIndex == o.objectIndex){
					s.gameStage.clickTargetList.splice(key,1);
				}
			}
		},
		onUpdate:function(){
			if(s.scaleX > 0 && isChangeDir == false){
				isChangeDir = true;
				s.openCardBack.visible = false;
				s.openCardObj.visible = false;
			}
		},
		onComplete:function(){
			s.mode = "close";
		}
	});
};
Card.prototype.openCard = function(event){
	var s = event.clickTarget;
	var isChangeDir = false;
	if(s.gameStage.lock == true)return;
	Scale3D.to(s,s.duration,{
		scaleX:-1,
		stay:s.stayTime,
		isBack:false,
		onStart:function(){
			s.mode = "opening";
		},
		onUpdate:function(){
			if(s.scaleX < 0 && isChangeDir == false){
				isChangeDir = true;
				s.openCardBack.visible = true;
				s.openCardObj.visible = true;
			}
		},
		onComplete:function(){
			s.mode = "open";
			s.getOtherOpenCard();
			s.gameStage.clearCard(s,s.otherOpenCard);
		}
	});
	s.gameStage.cardTweenList.push(Scale3D.tweenObj);
};
Card.prototype.destroy = function(){
	var s = this;
	s.mode = "destroy";
	s.gameStage.point+=s.gameStage.pointAdded;
	var tween = LTweenLite.to(s,s.duration,{
		alpha:0,
		onComplete:function(){
			s.remove();
			var l = s.gameStage.clickTargetList;
			for(var key=0; key<l.length; key++){
				var o = l[key];
				if(s.objectIndex == o.objectIndex){
					s.gameStage.clickTargetList.splice(key,1);
				}
			}
			s.gameStage.gameOver();
		}
	});
	s.gameStage.cardTweenList.push(tween);
};