function CWinPage(r){
	var self = this;
	base(self,LSprite,[]);
	
	self.result = r;
	
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	
	self.textLayer = new LSprite();
	self.addChild(self.textLayer);
	
	self.starLayer = new LSprite();
	self.addChild(self.starLayer);
	
	self.buttonLayer = new LSprite();
	self.buttonLayer.x = 380;
	self.buttonLayer.y = 260;
	self.addChild(self.buttonLayer);
	
	self.sWidth = 500;
	self.sHeight = 320;
	
	var borderObj = new CPageBorder(self.sWidth,self.sHeight,true);
	self.addChild(borderObj);
	
	self.addText();
	self.addStar();
	self.addButton();
	self.addBack();
	
	self.x = -1*self.getWidth();
	self.y = (LStage.height-self.sHeight)*0.5;
	
	self.tween = new $LTweenLite();
	self.addChild(self.tween);
	self.tween.to(self,1,{
		x:(LStage.width-self.getWidth())*0.5,
		onComplete:function(){
			self.removeChild(self.tween);
		}
	});
}
CWinPage.prototype.addText = function(){
	var self = this;
	
	var bitmapData = new LBitmapData(CGlobal.datalist["win_word"]);
	var bitmap = new LBitmap(bitmapData);
	self.textLayer.addChild(bitmap);
	
	bitmap.x = (self.sWidth-bitmap.getWidth())*0.5;
	bitmap.y = 30;
};
CWinPage.prototype.addStar = function(){
	var self = this;
	var starLayerWidth = 0;
	for(var i=0; i<self.result; i++){
		var bitmapData = new LBitmapData(CGlobal.datalist["star_icon"]);
		var bitmap = new LBitmap(bitmapData);
		bitmap.x = i*40;
		self.starLayer.addChild(bitmap);
		
		starLayerWidth = bitmap.x + parseInt(bitmap.getWidth());
	}
	self.starLayer.x = (self.sWidth-starLayerWidth)*0.5;
	self.starLayer.y = parseInt(self.textLayer.y) + parseInt(self.textLayer.getHeight()) + 40;
};
CWinPage.prototype.addButton = function(){
	var self = this;
	
	var okBtn = new CButtonSample("确定",0,function(){
		self.removeAllChild();
		CGlobal.clearAll();
		CGlobal.setBasicData();
		CGlobal.addSelectLevelPage();
	});
	self.buttonLayer.addChild(okBtn);
};
CWinPage.prototype.addBack = function(){
	var self = this;
	self.backLayer.graphics.drawRect(0,"",[0,0,self.sWidth,self.sHeight],true,"#333333");
	self.backLayer.alpha = 0.7;
};