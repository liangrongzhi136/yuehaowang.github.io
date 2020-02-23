function CLosePage(){
	var self = this;
	base(self,LSprite,[]);
	
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
CLosePage.prototype.addText = function(){
	var self = this;
	
	var bitmapData = new LBitmapData(CGlobal.datalist["lose_word"]);
	var bitmap = new LBitmap(bitmapData);
	self.textLayer.addChild(bitmap);
	
	bitmap.x = (self.sWidth-bitmap.getWidth())*0.5;
	bitmap.y = 30;
};
CLosePage.prototype.addButton = function(){
	var self = this;
	
	var okBtn = new CButtonSample("确定",0,function(){
		self.removeAllChild();
		CGlobal.clearAll();
		CGlobal.setBasicData();
		CGlobal.addSelectLevelPage();
	});
	self.buttonLayer.addChild(okBtn);
};
CLosePage.prototype.addBack = function(){
	var self = this;
	self.backLayer.graphics.drawRect(0,"",[0,0,self.sWidth,self.sHeight],true,"#333333");
	self.backLayer.alpha = 0.7;
};