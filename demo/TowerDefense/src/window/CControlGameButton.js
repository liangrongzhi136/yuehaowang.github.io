function CControlGameButton(name1,name2,func){
	var self = this;
	base(self,LSprite,[]);
	
	self.buttonMode = 0; 
	self.func = func;
	
	self.bitmap1 = new LBitmap(new LBitmapData(CGlobal.datalist[name1]));
	self.addChild(self.bitmap1);
	
	self.bitmap2 = new LBitmap(new LBitmapData(CGlobal.datalist[name2]));
	self.bitmap2.visible = false;
	self.addChild(self.bitmap2);
	
	self.addEventListener(LMouseEvent.MOUSE_DOWN,self._changeMode);
}
CControlGameButton.prototype._changeMode = function(event,self){
	if(CLock.lockStage)return;
	if(self.buttonMode == 0){
		self.buttonMode = 1;
		
		self.bitmap1.visible = false;
		self.bitmap2.visible = true;
	}else if(self.buttonMode == 1){
		self.buttonMode = 0;
		
		self.bitmap1.visible = true;
		self.bitmap2.visible = false;
	}
	self.func(self.buttonMode);
};
