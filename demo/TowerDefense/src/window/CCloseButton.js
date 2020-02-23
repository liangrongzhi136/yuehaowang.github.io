function CCloseButton(func){
	var self = this;
	base(self,LSprite,[]);
	
	var normalBitmapData = new LBitmapData(CGlobal.datalist["widgets"],350,305,36,33);
	self.normalBitmap = new LBitmap(normalBitmapData);
	var overBitmapData = new LBitmapData(CGlobal.datalist["widgets"],350,338,36,33);
	self.overBitmap = new LBitmap(overBitmapData);
	
	self.button = new LButton(self.normalBitmap,self.normalBitmap);
	self.addChild(self.button);
	
	var back = new LSprite();
	back.graphics.drawRect(0,"",[-20,-20,self.button.getWidth()+40,self.button.getHeight()+40],true,"transparent");
	self.addChild(back);
	
	self.button.addEventListener(LMouseEvent.MOUSE_DOWN,function(event){
		if(CLock.lockCharaOperating)return;
		var o = event.clickTarget;
		o.removeChild(o.bitmap_over);
		o.bitmap_over = o.parent.overBitmap;
		o.addChild(o.bitmap_over);
	});
	
	self.button.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		if(CLock.lockCharaOperating)return;
		var o = event.clickTarget;
		o.removeChild(o.bitmap_over);
		o.bitmap_over = o.parent.normalBitmap;
		o.addChild(o.bitmap_over);
		func(event,o.parent.parent);
	});
	
	self.addEventListener(LMouseEvent.MOUSE_MOVE,function(event){
		var o = event.clickTarget;
		if(
			event.selfX < self.button.x
			|| event.selfY < self.button.y
			|| event.selfX > self.button.x + self.button.getWidth()
			|| event.selfY > self.button.y + self.button.getHeight()
		){
			o.button.removeChild(o.button.bitmap_over);
			o.button.bitmap_over = o.normalBitmap;
			o.button.addChild(o.button.bitmap_over);
		}
	});
}