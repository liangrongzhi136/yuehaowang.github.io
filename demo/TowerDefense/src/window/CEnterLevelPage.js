function CEnterLevelPage(data){
	var self = this;
	base(self,LSprite,[]);
	
	self.data = data;
	
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	
	self.infoLayer = new LSprite();
	self.infoLayer.x = 40;
	self.infoLayer.y = 70;
	self.addChild(self.infoLayer);
	
	self.ctrlLayer = new LSprite();
	self.ctrlLayer.x = 350;
	self.ctrlLayer.y = 260;
	self.addChild(self.ctrlLayer);
	
	self.sWidth = 600;
	self.sHeight = 320;
	
	var borderObj = new CPageBorder(self.sWidth,self.sHeight,true);
	self.addChild(borderObj);
	
	self.addInfo();
	self.addButton();
	self.addBack();
	
	self.x = (LStage.width - self.getWidth())*0.5;
	self.y = (LStage.height - self.getHeight())*0.5;
}
CEnterLevelPage.prototype.addInfo = function(){
	var self = this;
	
	var infoWidth = 520;
	var infoHeight = 160;
	
	var ourCountryNameObj = new LTextField();
	ourCountryNameObj.text = "我方势力："+self.data.country["our"];
	ourCountryNameObj.color = "white";
	ourCountryNameObj.x = 20;
	ourCountryNameObj.y = -30;
	self.infoLayer.addChild(ourCountryNameObj);
	
	var enemyCountryNameObj = new LTextField();
	enemyCountryNameObj.text = "敌方势力："+self.data.country["enemy"];
	enemyCountryNameObj.color = "white";
	enemyCountryNameObj.x = parseInt(ourCountryNameObj.x)+ourCountryNameObj.getWidth()+30;
	enemyCountryNameObj.y = -30;
	self.infoLayer.addChild(enemyCountryNameObj);
	
	var infoTextObj = new LTextField();
	infoTextObj.width = infoWidth-60;
	infoTextObj.text = self.data.introduction;
	infoTextObj.color = "white";
	infoTextObj.x = 20;
	infoTextObj.y = 20;
	infoTextObj.setWordWrap(true,20);
	self.infoLayer.addChild(infoTextObj);
	
	var borderObj = new CPageBorder(infoWidth,infoHeight,false);
	self.infoLayer.addChild(borderObj);
};
CEnterLevelPage.prototype.addButton = function(){
	var self = this;
	
	var startBtn = new CButtonSample("开始战斗",0,function(){
		CGlobal.startGame(self.data.script);
	});
	self.ctrlLayer.addChild(startBtn);
	
	var cancelBtn = new CButtonSample("取消",1,function(){
		CLock.lockSelectLevelPage = false;
		self.parent.removeChild(self);
	});
	cancelBtn.x = 100;
	self.ctrlLayer.addChild(cancelBtn);
};
CEnterLevelPage.prototype.addBack = function(){
	var self = this;
	self.backLayer.graphics.drawRect(0,"",[0,0,self.sWidth,self.sHeight],true,"#333333");
	self.backLayer.alpha = 0.7;
};