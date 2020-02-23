function CAboutPage(){
	var self = this;
	base(self,LSprite,[]);
	
	//加入背景层
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	
	var bitmap = new LBitmap(new LBitmapData(CGlobal.datalist["about_back"]));
	bitmap.scaleX = LGlobal.width/bitmap.getWidth();
	bitmap.scaleY = LGlobal.height/bitmap.getHeight();
	self.backLayer.addChild(bitmap);
	
	//加入logo层
	self.logoLayer = new LSprite();
	self.logoLayer.alpha = 0;
	self.addChild(self.logoLayer);
	
	var bitmap = new LBitmap(new LBitmapData(CGlobal.datalist["ducle_logo"]));
	bitmap.scaleX = 100/bitmap.getWidth();
	bitmap.scaleY = 100/bitmap.getHeight();
	self.logoLayer.addChild(bitmap);
	
	var logoText = new LTextField();
	logoText.text = "Ducle Game";
	logoText.color = "white";
	logoText.size = 20;
	logoText.y = parseInt(self.logoLayer.getHeight());
	self.logoLayer.addChild(logoText);
	var shadow = new LDropShadowFilter(3,3,"white",10);
	logoText.filters = [shadow];
	
	bitmap.x = (logoText.getWidth()-bitmap.getWidth())*0.5
	self.logoLayer.x = (LGlobal.width-self.logoLayer.getWidth())*0.5;
	self.logoLayer.y = (LGlobal.height-self.logoLayer.getHeight()-50)*0.5;
	
	//加入内容层
	self.contentLayer = new LSprite();
	self.addChild(self.contentLayer);
	
	self.textFieldWidth = 400;
	self.contentHeight = 0;
	
	var increaseY = 80;
	
	/**添加内容*/
	//游戏设计
	var designerObj = new CAboutDesigner(self.textFieldWidth);
	designerObj.y = self.contentHeight;
	self.contentLayer.addChild(designerObj);
	self.contentHeight += designerObj._cHeight+increaseY;
	//游戏总监
	var directorObj = new CAboutDirector(self.textFieldWidth);
	directorObj.y = self.contentHeight;
	self.contentLayer.addChild(directorObj);
	self.contentHeight += directorObj._cHeight+increaseY;
	//游戏程序设计
	var programmerObj = new CAboutProgrammer(self.textFieldWidth);
	programmerObj.y = self.contentHeight;
	self.contentLayer.addChild(programmerObj);
	self.contentHeight += programmerObj._cHeight+increaseY;
	//游戏素材
	var artObj = new CAboutArt(self.textFieldWidth);
	artObj.y = self.contentHeight;
	self.contentLayer.addChild(artObj);
	self.contentHeight += artObj._cHeight+increaseY;
	//素材整理
	var artArrangeObj = new CAboutArtArrange(self.textFieldWidth);
	artArrangeObj.y = self.contentHeight;
	self.contentLayer.addChild(artArrangeObj);
	self.contentHeight += artArrangeObj._cHeight+increaseY;
	//游戏音乐
	var soundObj = new CAboutSound(self.textFieldWidth);
	soundObj.y = self.contentHeight;
	self.contentLayer.addChild(soundObj);
	self.contentHeight += soundObj._cHeight+increaseY;
	//测试人员
	var testerObj = new CAboutTester(self.textFieldWidth);
	testerObj.y = self.contentHeight;
	self.contentLayer.addChild(testerObj);
	self.contentHeight += testerObj._cHeight+increaseY;
	//游戏引擎
	var engineObj = new CAboutEngine(self.textFieldWidth);
	engineObj.y = self.contentHeight;
	self.contentLayer.addChild(engineObj);
	self.contentHeight += engineObj._cHeight;
		
	self.contentLayer.x = (LGlobal.width-self.textFieldWidth)*0.5;
	self.contentLayer.y = LStage.height + 10;
	
	//加入边框
	var pageBorder = new CPageBorder(LStage.width,LStage.height,true);
	self.addChild(pageBorder);
	
	//加入关闭按钮
	self.closeButton = new CCloseButton(function(){
		CGlobal.stageLayer.removeChild(self);
		self.die();
		//加入开始界面
		CGlobal.addBeginingPage();
	});
	self.closeButton.x = LGlobal.width-self.closeButton.button.getWidth()-10;
	self.closeButton.y = 5;
	self.addChild(self.closeButton);
	
	//加入时间轴事件
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
CAboutPage.prototype.onframe = function(self){
	if(self.contentLayer.y < -(self.contentHeight)+20){
		var tween = new $LTweenLite();
		self.addChild(tween);
		tween.to(self.logoLayer,2,{
			alpha:1,
			onComplete:function(){
				self.removeChild(tween);
			}
		});
		
		self.removeEventListener(LEvent.ENTER_FRAME,self.onframe);
		return;
	}
	self.contentLayer.y -= 5;
};