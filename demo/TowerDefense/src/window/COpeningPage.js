function COpeningPage(){
	var self = this;
	base(self,LSprite,[]);
	
	self.backMoveDir = "right";
	
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	
	self.titleLayer = new LSprite();
	self.addChild(self.titleLayer);
	
	self.buttonLayer = new LSprite();
	self.buttonLayer.y = 160;
	self.addChild(self.buttonLayer);
	
	//加入背景图片
	self._addBackImg();
	//加入游戏标题
	self._addTitle();
	//加入按钮
	self._addButton();
	
	//加入事件
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
COpeningPage.prototype._addBackImg = function(){
	var self = this;
	self.back = new LBitmap(new LBitmapData(CGlobal.datalist["opening_back"]));
	self.backLayer.addChild(self.back);
};
COpeningPage.prototype._addTitle = function(){
	var self = this;
	
	var title = new LTextField();
	title.text = "三国塔防-HTML5版";
	title.font = "微软雅黑";
	title.size = 50;
	title.x = 0.5*(LStage.width-title.getWidth());
	title.y = 60;
	self.titleLayer.addChild(title);
};
COpeningPage.prototype._addButton = function(){
	var self = this;
	
	//加入开始按钮
	var startBtn = new COpeningButton("开始游戏");
	startBtn.x = (LStage.width-startBtn.getWidth())*0.5;
	startBtn.y = 0;
	self.buttonLayer.addChild(startBtn);
	startBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(CLock.lockOpeningPage == true)return;
		CGlobal.gotoSelectLevelPage();
	});
	
	//加入关于按钮
	var aboutBtn = new COpeningButton("关于游戏");
	aboutBtn.x = (LStage.width-aboutBtn.getWidth())*0.5;
	aboutBtn.y = 90;
	self.buttonLayer.addChild(aboutBtn);
	aboutBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(CLock.lockOpeningPage == true)return;
		CGlobal.aboutGame();
	});
	
	//加入设置按钮
	var settingBtn = new COpeningButton("设置游戏");
	settingBtn.x = (LStage.width-settingBtn.getWidth())*0.5;
	settingBtn.y = 180;
	self.buttonLayer.addChild(settingBtn);
	settingBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(CLock.lockOpeningPage == true)return;
		CGlobal.setGame();
	});
};
COpeningPage.prototype.onframe = function(self){
	if(CLock.lockOpeningPage == true)return;
	if(self.backMoveDir == "left"){
		self.back.x -= 1;
		if(self.back.x <= -self.back.getWidth()+LStage.width){
			self.backMoveDir = "right";
		}
	}else if(self.backMoveDir == "right"){
		self.back.x += 1;
		if(self.back.x >= 0){
			self.backMoveDir = "left";
		}
	}
};