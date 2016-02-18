function OpeningPage(){
	var s = this;
	base(s,Scene,[]);
	
	var bitmap = new LBitmap(new LBitmapData(datalist["opening_back"]));
	bitmap.scaleX = LStage.width/bitmap.getWidth();
	bitmap.scaleY = LStage.height/bitmap.getHeight();
	s.addChild(bitmap);
	
	var logo = new LBitmap(new LBitmapData(datalist["logo"]));
	logo.x = (LStage.width-logo.getWidth())*0.5;
	logo.y = 50;
	s.addChild(logo);
	
	var buttonNormalStyle = new LBitmap(new LBitmapData(datalist["common_widget"],0,192,210,71));
	var buttonOverStyle = new LBitmap(new LBitmapData(datalist["common_widget"],398,192,210,71));
	
	var startBtn = new LButton(buttonNormalStyle.clone(),buttonOverStyle.clone());
	startBtn.x = (LStage.width-startBtn.getWidth())*0.5;
	startBtn.y = 210;
	s.addChild(startBtn);
	var startBtnText = new LBitmap(new LBitmapData(datalist["word_widget"],750,200,200,50));
	startBtnText.scaleX = startBtnText.scaleY = 0.8;
	startBtnText.x = (startBtn.getWidth()-startBtnText.getWidth())*0.5;
	startBtnText.y = (startBtn.getHeight()-startBtnText.getHeight())*0.5;
	startBtn.addChild(startBtnText);
	startBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(s.lock)return;
		s.hide();
		gotoSelectLevelPage();
	});
	
	var settingBtn = new LButton(buttonNormalStyle.clone(),buttonOverStyle.clone());
	settingBtn.x = (LStage.width-settingBtn.getWidth())*0.5;
	settingBtn.y = 300;
	s.addChild(settingBtn);
	var settingBtnText = new LBitmap(new LBitmapData(datalist["word_widget"],245,245,200,50));
	settingBtnText.scaleX = settingBtnText.scaleY = 0.8;
	settingBtnText.x = (settingBtn.getWidth()-settingBtnText.getWidth())*0.5;
	settingBtnText.y = (settingBtn.getHeight()-settingBtnText.getHeight())*0.5;
	settingBtn.addChild(settingBtnText);
	settingBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(s.lock)return;
		s.hide();
		gotoSettingPage();
	});
	
	var curtain = new LSprite();
	curtain.graphics.drawRect(0,"",[0,0,LStage.width,LStage.height],true,"black");
	s.addChild(curtain);
	
	s.display(function(){
		LTweenLite.to(curtain,1.5,{alpha:0,delay:1});
	});
}