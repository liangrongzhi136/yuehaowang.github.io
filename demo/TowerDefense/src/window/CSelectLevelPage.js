function CSelectLevelPage(){
	var self = this;
	base(self,LSprite,[]);
	
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.cityLayer = new LSprite();
	self.addChild(self.cityLayer);
	self.cloudLayer = new LSprite();
	self.addChild(self.cloudLayer);
	
	var borderObj = new CPageBorder(LStage.width,LStage.height,true);
	self.addChild(borderObj);
		
	self.addMap(self);
	self.addCity(self);
	self.addClouds(self);
	self.addCloseButton(self);
	self.addExhibitionButton(self);
	
	var back = new LSprite();
	back.graphics.drawRect(0,"",[0,0,LStage.width,LStage.height],true,"black");
	self.addChild(back);
	LTweenLite.to(back,1,{
		alpha: 0,
		onComplete:function(s){
			s.parent.removeChild(s);
		}
	});
}
CSelectLevelPage.prototype.addExhibitionButton = function(self){
	var exhibitionButton = new LSprite();
	exhibitionButton.x = 30;
	exhibitionButton.y = LStage.height-150;
	self.addChild(exhibitionButton);
	
	var textObj = new LTextField();
	textObj.text = "武将一览";
	textObj.color = "orangered";
	textObj.size = 12;
	textObj.weight = "bold";
	exhibitionButton.addChild(textObj);
	
	var bitmap = new LBitmap(new LBitmapData(CGlobal.datalist["bingying"]));
	bitmap.scaleX = 0.8;
	bitmap.scaleY = 0.8;
	exhibitionButton.addChild(bitmap);
	
	bitmap.y = textObj.getHeight()+5;
	textObj.x = (bitmap.getWidth()-textObj.getWidth())*0.5;
	
	exhibitionButton.addEventListener(LMouseEvent.MOUSE_UP,CGlobal.generalExhibition);
};
CSelectLevelPage.prototype.addCloseButton = function(self){
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
};
CSelectLevelPage.prototype.addMap = function(self){
	var bitmapData = new LBitmapData(CGlobal.datalist["chinese_map"]);
	var bitmap = new LBitmap(bitmapData);
	self.backLayer.addChild(bitmap);
	
	var scaleValue = LStage.width/bitmap.getWidth();
	bitmap.scaleX = scaleValue;
	bitmap.scaleY = 1;
	bitmap.y = -70;
};
CSelectLevelPage.prototype.addCity = function(self){
	for(var key in levelData){
		var cityObj = new CLevelCity(levelData[key]);
		self.cityLayer.addChild(cityObj);
	}
};
CSelectLevelPage.prototype.addClouds = function(self){
	var cloudObj = new CLevelCloud();
	self.cloudLayer.addChild(cloudObj);
};