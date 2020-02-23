function COpeningButton(text){
	var self = this;
	base(self,LSprite,[]);
		
	self.normalStyle = new LSprite();
	self.overStyle = new LSprite();
	
	var bitmapData = new LBitmapData(CGlobal.datalist["ink_button"],0,350,200,55);
	for(var i=0; i<2; i++){
		var buttonBack = new LBitmap(bitmapData);
		buttonBack.scaleX = 1.5;
		buttonBack.scaleY = 1.5;
		self.normalStyle.addChild(buttonBack);
	}
	for(var i=0; i<3; i++){
		var buttonBack = new LBitmap(bitmapData);
		buttonBack.scaleX = 1.5;
		buttonBack.scaleY = 1.5;
		self.overStyle.addChild(buttonBack);
	}
	self.overStyleChildList = self.overStyle.childList;
		
	self.button = new LButton(self.normalStyle,self.overStyle);
	self.addChild(self.button);
	
	var textObj = new LTextField();
	textObj.text = text;
	textObj.color = "white";
	textObj.size = 15;
	textObj.x = 30;
	textObj.y = 25;
	self.addChild(textObj);
	
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
COpeningButton.prototype.onframe = function(self){
	if(CLock.lockOpeningPage == true){
		self.overStyle.childList = self.normalStyle.childList;
	}else{
		self.overStyle.childList = self.overStyleChildList;
	}
};