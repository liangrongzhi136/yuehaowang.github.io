function SettingPage(){
	var s = this;
	base(s,Scene,[]);
	
	var bitmap = new LBitmap(new LBitmapData(datalist["setting_back"]));
	bitmap.scaleX = LStage.width/bitmap.getWidth();
	bitmap.scaleY = LStage.height/bitmap.getHeight();
	s.addChild(bitmap);
	
	s.buttonNormalStyle = new LBitmap(new LBitmapData(datalist["options_widget"],0,90,210,70));
	s.buttonNormalStyle.scaleX = s.buttonNormalStyle.scaleY = 0.8;
	s.buttonOverStyle = new LBitmap(new LBitmapData(datalist["options_widget"],209,90,210,70));
	s.buttonOverStyle.scaleX = s.buttonOverStyle.scaleY = 0.8;
	
	s.settingMusicLayer = new LSprite();
	s.addChild(s.settingMusicLayer);
	
	s.backButtonLayer = new LSprite();
	s.addChild(s.backButtonLayer);
	
	s.addSettingMusic();
	s.addBackButton();
	
	s.x = -LStage.width;
	s.alpha = 0;
	
	s.display();
}
SettingPage.prototype.addSettingMusic = function(){
	var s = this;
	
	var back = new LBitmap(new LBitmapData(datalist["dlg_back"]));
	back.scaleY = 0.5;
	s.settingMusicLayer.addChild(back);
	
	var title = new LBitmap(new LBitmapData(datalist["options_widget"],0,0,110,40));
	title.x = 30;
	title.y = (s.settingMusicLayer.getHeight()-title.getHeight())*0.5;
	s.settingMusicLayer.addChild(title);
		
	var openButton = new LButton(s.buttonNormalStyle.clone(),s.buttonOverStyle.clone());
	openButton.x = 150;
	openButton.y = (s.settingMusicLayer.getHeight()-openButton.getHeight())*0.5;
	s.settingMusicLayer.addChild(openButton);
	var openButtonText = new LBitmap(new LBitmapData(datalist["options_widget"],0,50,120,33));
	openButtonText.scaleX = openButtonText.scaleY = 0.8;
	openButtonText.x = (openButton.getWidth()-openButtonText.getWidth())*0.5;
	openButtonText.y = (openButton.getHeight()-openButtonText.getHeight())*0.5;
	openButton.addChild(openButtonText);
	openButton.addEventListener(LMouseEvent.MOUSE_DOWN,MusicManager.setMusicValid);
	
	var closeButton = new LButton(s.buttonNormalStyle.clone(),s.buttonOverStyle.clone());
	closeButton.x = 320;
	closeButton.y = (s.settingMusicLayer.getHeight()-closeButton.getHeight())*0.5;
	s.settingMusicLayer.addChild(closeButton);
	var closeButtonText = new LBitmap(new LBitmapData(datalist["options_widget"],220,0,120,43));
	closeButtonText.scaleX = closeButtonText.scaleY = 0.8;
	closeButtonText.x = (closeButton.getWidth()-closeButtonText.getWidth())*0.5;
	closeButtonText.y = (closeButton.getHeight()-closeButtonText.getHeight())*0.5;
	closeButton.addChild(closeButtonText);
	closeButton.addEventListener(LMouseEvent.MOUSE_DOWN,MusicManager.setMusicMute);
	
	s.settingMusicLayer.x = (s.getWidth()-s.settingMusicLayer.getWidth())*0.5;
	s.settingMusicLayer.y = 50;
};
SettingPage.prototype.addBackButton = function(){
	var s = this;
	
	var back = new LBitmap(new LBitmapData(datalist["dlg_back"]));
	back.scaleY = 0.5;
	s.backButtonLayer.addChild(back);
	
	var backButton = new LButton(s.buttonNormalStyle.clone(),s.buttonOverStyle.clone());
	backButton.x = (s.backButtonLayer.getWidth()-backButton.getWidth())*0.5;
	backButton.y = (s.backButtonLayer.getHeight()-backButton.getHeight())*0.5;
	s.backButtonLayer.addChild(backButton);
	var backButtonText = new LBitmap(new LBitmapData(datalist["options_widget"],340,0,120,43));
	backButtonText.scaleX = backButtonText.scaleY = 0.8;
	backButtonText.x = (backButton.getWidth()-backButtonText.getWidth())*0.5;
	backButtonText.y = (backButton.getHeight()-backButtonText.getHeight())*0.5;
	backButton.addChild(backButtonText);
	backButton.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(s.lock)return;
		
		var curtain = new LSprite();
		curtain.alpha = 0;
		curtain.graphics.drawRect(0,"",[0,0,LStage.width,LStage.height],true,"black");
		addChild(curtain);
		
		LTweenLite.to(curtain,1,{
			alpha:1,
			onComplete:function(){
				s.hide();
				addOpeningPage();
				curtain.remove();
			}
		});
	});
	
	s.backButtonLayer.x = (s.getWidth()-s.backButtonLayer.getWidth())*0.5;
	s.backButtonLayer.y = 250;
};