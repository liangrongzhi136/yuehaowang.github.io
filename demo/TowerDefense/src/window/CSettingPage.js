function CSettingPage(){
	var self = this;
	base(self,LSprite,[]);
	
	//背景层
	self.backLayer = new LSprite();
	self.backLayer.alpha = 0.8;
	self.backLayer.graphics.drawRect(0,"",[0,0,LStage.width,LStage.height],true,"black");
	self.addChild(self.backLayer);
	
	//内容层
	self.contentLayer = new LSprite();
	self.contentLayer.x = 100;
	self.contentLayer.y = 100;
	self.addChild(self.contentLayer);
	
	//音乐选项层
	self.musicOptionLayer = new LSprite();
	self.contentLayer.addChild(self.musicOptionLayer);
	//游戏速度选项层
	self.speedOptionLayer = new LSprite();
	self.contentLayer.addChild(self.speedOptionLayer);
	
	//加入边框
	var pageBorder = new CPageBorder(LStage.width,LStage.height,true);
	self.addChild(pageBorder);
	
	//加入音乐选项
	self.addMusicOptions();
	//加入游戏速度选项
	self.addSpeedOptions();
	
	//加入提示信息
	var promptText = new LTextField();
	promptText.text = "※如果游戏出现异常，请及时联系作者：wangyuehao1999@gmail.com";
	promptText.color = "white";
	promptText.x = 100;
	promptText.y = 280;
	promptText.size = 15;
	self.addChild(promptText);
	
	//加入关闭按钮
	self.closeButton = new CCloseButton(function(){
		CGlobal.stageLayer.removeChild(self);
		self.die();
		CLock.lockOpeningPage = false;
	});
	self.closeButton.x = LGlobal.width-self.closeButton.button.getWidth()-10;
	self.closeButton.y = 5;
	self.addChild(self.closeButton);
}
CSettingPage.prototype.addMusicOptions = function(){
	var self = this;
	
	var textObj
	textObj = new LTextField();
	textObj.y = 5;
	textObj.size = 20;
	textObj.color = "white";
	textObj.text = "游戏音乐";
	self.musicOptionLayer.addChild(textObj);
	
	textObj = new LTextField();
	textObj.x = 130;
	textObj.y = 12;
	textObj.size = 15;
	textObj.color = "white";
	textObj.text = "有";
	self.musicOptionLayer.addChild(textObj);
	
	textObj = new LTextField();
	textObj.x = 225;
	textObj.y = 12;
	textObj.size = 15;
	textObj.color = "white";
	textObj.text = "无";
	self.musicOptionLayer.addChild(textObj);
		
	var radio = new LRadio();
	self.musicOptionLayer.addChild(radio);

	var child;
	
	child = new LRadioChild(true,new CRadioStyle(),new CRadioSelectStyle());
	child.x = 160;
	radio.push(child);
	child.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		CGlobal.isMusicPlay = e.clickTarget.value;
		CMusicManager.soundVolume = 1;
		CMusicManager.setMusicValid();
	});
	
	child = new LRadioChild(false,new CRadioStyle(),new CRadioSelectStyle());
	child.x = 255;
	radio.push(child);
	child.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		CGlobal.isMusicPlay = e.clickTarget.value;
		CMusicManager.soundVolume = 0;
		CMusicManager.setMusicMute();
	});
	
	radio.setValue(CGlobal.isMusicPlay);
};
CSettingPage.prototype.addSpeedOptions = function(){	
	var self = this;
	
	self.speedOptionLayer.y = self.musicOptionLayer.getHeight()+30;
	
	var textObj
	textObj = new LTextField();
	textObj.y = 5;
	textObj.size = 20;
	textObj.color = "white";
	textObj.text = "游戏速度";
	self.speedOptionLayer.addChild(textObj);
	
	textObj = new LTextField();
	textObj.x = 130;
	textObj.y = 12;
	textObj.size = 15;
	textObj.color = "white";
	textObj.text = "普通";
	self.speedOptionLayer.addChild(textObj);
	
	textObj = new LTextField();
	textObj.x = 245;
	textObj.y = 12;
	textObj.size = 15;
	textObj.color = "white";
	textObj.text = "快速";
	self.speedOptionLayer.addChild(textObj);
		
	var radio = new LRadio();
	self.speedOptionLayer.addChild(radio);

	var child;
	
	child = new LRadioChild("normal",new CRadioStyle(),new CRadioSelectStyle());
	child.x = 180;
	radio.push(child);
	child.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		CGlobal.gameSpeed = e.clickTarget.value;
		var speed = 50;
		LGlobal.speed = speed;
		LGlobal.setFrameRate(speed);
	});
	
	child = new LRadioChild("fast",new CRadioStyle(),new CRadioSelectStyle());
	child.x = 295;
	radio.push(child);
	child.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		CGlobal.gameSpeed = e.clickTarget.value;
		var speed = 10;
		LGlobal.speed = speed;
		LGlobal.setFrameRate(speed);
	});
	
	radio.setValue(CGlobal.gameSpeed);
};