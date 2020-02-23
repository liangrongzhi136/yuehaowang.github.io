function CLevelCity(data){
	var self = this;
	base(self,LSprite,[]);
	
	self.data = data;
	
	self.x = self.data.x;
	self.y = self.data.y;
	
	var bitmapData = new LBitmapData(CGlobal.datalist["city"]);
	var bitmap = new LBitmap(bitmapData);
	bitmap.scaleX = 0.8;
	bitmap.scaleY = 0.8;
	self.addChild(bitmap);
	
	var textObj = new LTextField();
	textObj.text = self.data.name;
	textObj.color = "orangered";
	textObj.weight = "bold";
	textObj.x = (bitmap.getWidth()-textObj.getWidth())*0.5
	textObj.y = -20;
	self.addChild(textObj);
	
	self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(CLock.lockSelectLevelPage)return;
		var pageObj = new CEnterLevelPage(self.data);
		CGlobal.stageLayer.addChild(pageObj);
		CLock.lockSelectLevelPage = true;
	});
}