function CButtonSample(text,style,func){
	var self = this;
	base(self,LSprite,[]);
	
	var styleList = [
		[
			new LBitmap(new LBitmapData(CGlobal.datalist["widgets"],385,170,95,30)),
			new LBitmap(new LBitmapData(CGlobal.datalist["widgets"],385,202,95,30))
		],
		[
			new LBitmap(new LBitmapData(CGlobal.datalist["widgets"],284,170,100,30)),
			new LBitmap(new LBitmapData(CGlobal.datalist["widgets"],284,202,100,30))
		]
	];
		
	self.normalBitmap = styleList[style][0];
	self.overBitmap = styleList[style][1];
	self.btn = new LButton(self.normalBitmap,self.normalBitmap);
	self.btn.x = 0;
	self.btn.y = 0;
	self.btn.scaleY = 1.2;
	self.addChild(self.btn);
	
	var back = new LSprite();
	back.graphics.drawRect(0,"",[-20,-20,self.btn.getWidth()+40,self.btn.getHeight()+40],true,"transparent");
	self.addChild(back);
	
	self.btn.addEventListener(LMouseEvent.MOUSE_UP,function(event){
		var o = event.clickTarget;
		o.removeChild(o.bitmap_over);
		o.bitmap_over = o.parent.normalBitmap;
		o.addChild(o.bitmap_over);
		func();
	});
	self.btn.addEventListener(LMouseEvent.MOUSE_DOWN,function(event){
		var o = event.clickTarget;
		o.removeChild(o.bitmap_over);
		o.bitmap_over = o.parent.overBitmap;
		o.addChild(o.bitmap_over);
	});
	self.addEventListener(LMouseEvent.MOUSE_MOVE,function(event){
		var o = event.clickTarget;
		if(
			event.selfX < self.btn.x
			|| event.selfY < self.btn.y
			|| event.selfX > self.btn.x + self.btn.getWidth()
			|| event.selfY > self.btn.y + self.btn.getHeight()
		){
			o.btn.removeChild(o.btn.bitmap_over);
			o.btn.bitmap_over = o.normalBitmap;
			o.btn.addChild(o.btn.bitmap_over);
		}
	});
	
	var textObj = new LTextField();
	textObj.color = "white";
	textObj.text = text;
	textObj.x = self.btn.x + (self.btn.getWidth()-textObj.getWidth())*0.5;
	textObj.y = 7;
	self.addChild(textObj);	
}