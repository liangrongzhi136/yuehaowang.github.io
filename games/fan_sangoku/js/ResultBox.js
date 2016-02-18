function ResultBox(type,starNum){
	var s = this;
	base(s,LSprite,[]);
	
	s.lock = true;
	s.starNum = starNum;
	
	var bgBitmap = new LBitmap(new LBitmapData(datalist["dlg_back"]));
	s.addChild(bgBitmap);
	var buttonLayer = new LSprite();
	s.addChild(buttonLayer);
	s.contentLayer = new LSprite();
	s.addChild(s.contentLayer);
	
	var buttonNormalStyle = new LBitmap(new LBitmapData(datalist["common_widget"],0,192,210,71));
	buttonNormalStyle.scaleX = buttonNormalStyle.scaleY = 0.8;
	var buttonOverStyle = new LBitmap(new LBitmapData(datalist["common_widget"],398,192,210,71));
	buttonOverStyle.scaleX = buttonOverStyle.scaleY = 0.8;
	
	var btnY;
	s.quitBtn = new LButton(buttonNormalStyle.clone(),buttonOverStyle.clone());
	btnY = bgBitmap.getHeight()-s.quitBtn.getHeight()-50;
	s.quitBtn.x = 0;
	s.quitBtn.y = btnY;
	buttonLayer.addChild(s.quitBtn);
	var quitBtnText = new LBitmap(new LBitmapData(datalist["system_word_widget"],480,0,200,50));
	quitBtnText.scaleX = quitBtnText.scaleY = 0.6;
	quitBtnText.x = (s.quitBtn.getWidth()-quitBtnText.getWidth())*0.5;
	quitBtnText.y = (s.quitBtn.getHeight()-quitBtnText.getHeight())*0.5;
	s.quitBtn.addChild(quitBtnText);
	s.quitBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(s.lock)return;
		s.parent.hide();
		gotoSelectLevelPage();
	});
	
	s.replayBtn = new LButton(buttonNormalStyle.clone(),buttonOverStyle.clone());
	s.replayBtn.x = s.quitBtn.getWidth()+20;
	s.replayBtn.y = btnY;
	buttonLayer.addChild(s.replayBtn);
	var replayBtnText = new LBitmap(new LBitmapData(datalist["system_word_widget"],670,0,200,50));
	replayBtnText.scaleX = replayBtnText.scaleY = 0.6;
	replayBtnText.x = (s.replayBtn.getWidth()-replayBtnText.getWidth())*0.5;
	replayBtnText.y = (s.replayBtn.getHeight()-replayBtnText.getHeight())*0.5;
	s.replayBtn.addChild(replayBtnText);
	s.replayBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(s.lock)return;
		s.parent.hide();
		startGame(s.parent.levelIndex);
	});
	
	if(type == "lose"){
		s.addLoseContent();
	}else{
		s.addWinContent();
	}
	
	buttonLayer.x = (s.getWidth()-buttonLayer.getWidth())*0.5;
	buttonLayer.y = (s.getHeight()-buttonLayer.getHeight())*0.5;
	
	s.x = -s.getWidth();
	s.y = (LStage.height-s.getHeight())*0.5;
	LTweenLite.to(s,1,{
		x:(LStage.width-s.getWidth())*0.5,
		onComplete:function(){
			s.lock = false;
		}
	});
}
ResultBox.prototype.addLoseContent = function(){
	var s = this;
	
	var wordBitmap = new LBitmap(new LBitmapData(datalist["lose_word"]));
	wordBitmap.x = (s.getWidth() - wordBitmap.getWidth())*0.5;
	wordBitmap.y = 30;
	s.contentLayer.addChild(wordBitmap);
};
ResultBox.prototype.addWinContent = function(){
	var s = this;
	
	var wordBitmap = new LBitmap(new LBitmapData(datalist["win_word"]));
	wordBitmap.x = (s.getWidth() - wordBitmap.getWidth())*0.5;
	wordBitmap.y = 30;
	s.contentLayer.addChild(wordBitmap);
	
	var starLayer = new LSprite();
	s.contentLayer.addChild(starLayer);
	
	for(var i=0; i<5; i++){
		var starBitmap
		if(i <= s.starNum){
			starBitmap = new LBitmap(new LBitmapData(datalist["star"]));
		}else{
			starBitmap = new LBitmap(new LBitmapData(datalist["star_blank"]));
		}
		starBitmap.x = starBitmap.getWidth()*i;
		starLayer.addChild(starBitmap);
	}
	starLayer.x = (s.getWidth()-starLayer.getWidth())*0.5;
	starLayer.y = wordBitmap.y + wordBitmap.getHeight()+10;
};