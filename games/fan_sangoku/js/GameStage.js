function GameStage(levelIndex){
	var s = this;
	base(s,Scene,[]);
	s.lock = true;
	
	s._cardWidth = 110;
	s._cardHeight = 110;
	s.contentWidth = 660;
	s.contentHeight = LStage.height;
	
	s.levelIndex = levelIndex;
	s.levelData = levelData["level"+levelIndex];
	s.amount = s.levelData["amount"];
	s.debut = s.levelData["debut"];
	s.stayTime = s.levelData["stayTime"];
	s.unlock = s.levelData["unlock"];
	
	s.point = 0;
	s.originalPointAdded = 10;
	s.pointAdder = s.originalPointAdded;
	s.isLastOneAddPonit = false;
	s.pointObj = null;
	
	s.gameTime = s.levelData["time"];
	s.currentTime = 0;
	s.timeBarObj = null;
	s.timeBarContent = null;
	
	s.quitBtn = null;
	s.replayBtn = null;
	
	s.clickTargetList = new Array();
	s.cardTweenList = new Array();
	
	s.backLayer = new LSprite();
	s.addChild(s.backLayer);
	s.cardLayer = new LSprite();
	s.addChild(s.cardLayer);
	s.overLayer = new LSprite();
	s.overLayer.x = s.contentWidth;
	s.overLayer.y = 0;
	s.addChild(s.overLayer);
	
	s.addBack();
	s.addCard();
	s.addInfo();
	s.addTime();
	
	s.x = -LStage.width;
	s.alpha = 0;
	
	s.cardLayer.x = (s.contentWidth-s.cardLayer.getWidth())*0.5;
	s.cardLayer.y = (s.contentHeight-s.cardLayer.getHeight())*0.5;
	
	s.display(function(o){
		s.initGameStage(o);
	});
}
GameStage.prototype.initGameStage = function(s){
	var co;
	for(var i=0; i<s.cardLayer.childList.length; i++){
		co = s.cardLayer.childList[i];
		co.addEventListener(LMouseEvent.MOUSE_UP,function(event){
			if(s.lock == true)return;
			var o = event.clickTarget;
			if(
				s.clickTargetList.length >= 2
				||o.mode == "opening"
				||o.mode == "open"
				||o.mode == "closing"
			){
				return;
			}
			s.clickTargetList.push(o);
			o.openCard(event);
		});
	}
	s._lastOnframeTime = (new Date()).getTime();
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
};
GameStage.prototype.onframe = function(event){
	var s = event.target;
	var increaseTime = ((new Date()).getTime()-s._lastOnframeTime)/1000;
	s._lastOnframeTime = (new Date()).getTime();
	s.currentTime+=increaseTime;
	s.setTimeBarContent(s.currentTime/s.gameTime);
};
GameStage.prototype.setTimeBarContent = function(v){
	var s = this;
	if(v>1){
		v=1;
		s.gameOver();
	}
	var sv = (s.timeBarObj.getWidth()-60)*v+30;
	s.timeBarContent.graphics.clear();
	s.timeBarContent.graphics.drawRect(0,"",[sv,12,s.timeBarObj.getWidth()-30-sv,12],true,"red");
};
GameStage.prototype.addBack = function(){
	var s = this;
	var bitmap = new LBitmap(new LBitmapData(datalist["gamebody_back"]));
	bitmap.scaleX = LStage.width/bitmap.getWidth();
	bitmap.scaleY = LStage.height/bitmap.getHeight();
	s.backLayer.addChild(bitmap);
};
GameStage.prototype.addCard = function(){
	var s = this;
	
	var list = s.getRandomCardList();
	var mxi = s.amount[0];
	var myi = s.amount[1];
	var index = 0;
	var y = 0,x = 0;
	
	for(var i=0; i<mxi*myi; i++){
		if(index >= mxi){
			index = 0;
			y += s._cardHeight;
		}
		x = index*s._cardWidth;
		var cardObj = new Card(list[i],s._cardWidth,s._cardHeight,s.stayTime);
		cardObj.x = x;
		cardObj.y = y;
		s.cardLayer.addChild(cardObj);
		cardObj.initCard();
		index++;
	}
};
GameStage.prototype.addInfo = function(){
	var s = this;
	var bgBitmap = new LBitmap(new LBitmapData(datalist["gameinfo_back"],90,32,332,446));
	bgBitmap.scaleX = (LStage.width-s.contentWidth)/bgBitmap.getWidth();
	bgBitmap.scaleY = LStage.height/bgBitmap.getHeight();
	s.overLayer.addChild(bgBitmap);
	
	var pointBitmap = new LBitmap(new LBitmapData(datalist["system_word_widget"],553,60,120,30));
	pointBitmap.x = 20;
	pointBitmap.y = 20;
	s.overLayer.addChild(pointBitmap);
	
	s.pointObj = new Point(s.overLayer.getWidth());
	s.pointObj.y = 80;
	s.overLayer.addChild(s.pointObj);
	s.pointObj.setNumber(0);
	
	var buttonNormalStyle = new LBitmap(new LBitmapData(datalist["common_widget"],0,192,210,71));
	buttonNormalStyle.scaleX = 0.55;
	buttonNormalStyle.scaleY = 0.55;
	var buttonOverStyle = new LBitmap(new LBitmapData(datalist["common_widget"],398,192,210,71));
	buttonOverStyle.scaleX = 0.55;
	buttonOverStyle.scaleY = 0.55;
	
	s.quitBtn = new LButton(buttonNormalStyle.clone(),buttonOverStyle.clone());
	s.quitBtn.x = (bgBitmap.getWidth()-s.quitBtn.getWidth())*0.5;
	s.quitBtn.y = 340;
	s.overLayer.addChild(s.quitBtn);
	var quitBtnText = new LBitmap(new LBitmapData(datalist["system_word_widget"],480,0,200,50));
	quitBtnText.scaleX = quitBtnText.scaleY = 0.5;
	quitBtnText.x = (s.quitBtn.getWidth()-quitBtnText.getWidth())*0.5;
	quitBtnText.y = (s.quitBtn.getHeight()-quitBtnText.getHeight())*0.5;
	s.quitBtn.addChild(quitBtnText);
	s.quitBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(s.lock)return;
		s.hide();
		gotoSelectLevelPage();
	});
	
	s.replayBtn = new LButton(buttonNormalStyle.clone(),buttonOverStyle.clone());
	s.replayBtn.x = (bgBitmap.getWidth()-s.replayBtn.getWidth())*0.5;
	s.replayBtn.y = 390;
	s.overLayer.addChild(s.replayBtn);
	var replayBtnText = new LBitmap(new LBitmapData(datalist["system_word_widget"],670,0,200,50));
	replayBtnText.scaleX = replayBtnText.scaleY = 0.5;
	replayBtnText.x = (s.replayBtn.getWidth()-replayBtnText.getWidth())*0.5;
	replayBtnText.y = (s.replayBtn.getHeight()-replayBtnText.getHeight())*0.5;
	s.replayBtn.addChild(replayBtnText);
	s.replayBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(s.lock)return;
		s.hide();
		startGame(s.levelIndex);
	});
};
GameStage.prototype.addTime = function(){
	var s = this;
	s.timeBarObj = new LSprite();
	s.timeBarObj.rotate = 90;
	s.overLayer.addChild(s.timeBarObj);
	var bgBitmap = new LBitmap(new LBitmapData(datalist["timebar_bg"]));
	s.timeBarObj.addChild(bgBitmap);
	s.timeBarObj.y = (s.contentHeight-s.timeBarObj.getWidth())*0.5;
	s.timeBarContent = new LSprite();
	s.timeBarObj.addChild(s.timeBarContent);
	s.timeBarContent.graphics.drawRect(0,"",[30,12,s.timeBarObj.getWidth()-60,12],true,"red");
};
GameStage.prototype.getRandomCardList = function(){
	var s = this;
	var a = s.amount[0]*s.amount[1];
	var list = new Array();
	var debut = {};
	var debutNameList = new Array();
	var debutNumList = new Array();
	for(var key in s.debut){
		debut[key] = s.debut[key];
		debutNameList.push(key);
		debutNumList.push(0);
	}
	var nameIndex;
	for(var i=0; i<=a; i++){
		nameIndex = Math.floor(Math.random()*debutNameList.length);
		var o = debutNameList[nameIndex];
		list.push(o);
		debutNumList[nameIndex]++;
		if(debutNumList[nameIndex] >= debut[o]*2){
			debutNumList.splice(nameIndex,1);
			debutNameList.splice(nameIndex,1);
		}
	}
	return list;
};
GameStage.prototype.clearCard = function(c1,c2){
	var s = this;
	if((c1==null || c2==null) || (c1.mode!="open" || c2.mode!="open"))return;
	if(c1.name == c2.name){
		if(s.isLastOneAddPonit == true){
			s.pointAdded += 5;
		}else{
			s.pointAdded = s.originalPointAdded;
		}
		c1.destroy();
		c2.destroy();
		if(s.pointObj)s.pointObj.setNumber(s.point);
		s.isLastOneAddPonit = true;
	}else{
		s.isLastOneAddPonit = false;
	}
};
GameStage.prototype.gameOver = function(){
	var s = this;
	
	if(s.lock == true)return;
	s.lock = true;
	if(s.cardLayer.childList.length == 0){
		var resultBitmapObj = new LBitmap(new LBitmapData(datalist["result_widget"],0,95,120,95));
		resultBitmapObj.imgType = "win";
		unlockLevel.push(s.unlock);
		saveUnlockLevel();
	}else if(s.currentTime >= s.gameTime){
		var resultBitmapObj = new LBitmap(new LBitmapData(datalist["result_widget"],657,0,110,95));
		resultBitmapObj.imgType = "lose";
	}else{
		s.lock = false;
		return;
	}
	
	var bitmap_over = s.quitBtn.bitmap_up.clone();
	s.quitBtn.bitmap_over.bitmapData = bitmap_over.bitmapData.clone();
	s.replayBtn.bitmap_over.bitmapData = bitmap_over.bitmapData.clone();
	
	LTweenLite.removeAll();
	
	s.removeEventListener(LEvent.ENTER_FRAME,s.onframe);
	
	var obj = new LSprite();
	s.addChild(obj);
	obj.addChild(resultBitmapObj);
	obj.x = (LStage.width-obj.getWidth())*0.5;
	obj.y = -obj.getHeight();
	
	setTimeout(function(){
		s.pointObj.setNumber();
		obj.getRotateXY(obj.getWidth(),obj.getHeight());
		LTweenLite.to(obj,2,{
			y:(LStage.height-obj.getHeight())*0.5,
			ease:Back.easeOut,
			onComplete:function(){
				LTweenLite.to(obj,1,{
					onStart:function(){
						var back = new LSprite();
						back.alpha = 0;
						back.graphics.drawRect(0,"",[0,0,LStage.width,LStage.height],true,"black");
						s.addChild(back);
						LTweenLite.to(back,2,{
							alpha:0.7
						});
						
						var resultObj = new ResultBox(resultBitmapObj.imgType,s.getResult());
						s.addChild(resultObj);
					},
					delay:1,
					rotate:3600,
					x:0,
					y:LStage.height,
					ease:Quad.easeOut
				});
			}
		})
	},500);
};
GameStage.prototype.getResult = function(){
	var s = this;
	if(s.currentTime <= Math.ceil(s.gameTime*0.2)){
		return 5;
	}else if(s.currentTime <= Math.ceil(s.gameTime*0.4)){
		return 4;
	}else if(s.currentTime <= Math.ceil(s.gameTime*0.6)){
		return 3;
	}else if(s.currentTime <= Math.ceil(s.gameTime*0.8)){
		return 2;
	}else{
		return 1;
	}
};