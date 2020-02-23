function CAboutEngine(width){
	var self = this;
	base(self,LSprite,[]);
	
	self._cHeight = 0;
	
	var titleTextObj = new LTextField();
	titleTextObj.weight = "bold";
	titleTextObj.size = 20;
	titleTextObj.color = "white";
	titleTextObj.text = "游戏引擎";
	titleTextObj.x = (width-titleTextObj.getWidth())*0.5;
	titleTextObj.y = 0;
	self.addChild(titleTextObj);
	
	var contentTextObj = new LTextField();
	contentTextObj.size = 15;
	contentTextObj.text = "lufylegend.js v1.7.7";
	contentTextObj.color = "white";
	contentTextObj.x = (width-contentTextObj.getWidth())*0.5;
	contentTextObj.y = parseInt(titleTextObj.y)+parseInt(titleTextObj.getHeight())+30;
	self.addChild(contentTextObj);
	
	var bitmap = new LBitmap(new LBitmapData(CGlobal.datalist["lufylegend.js"]));
	bitmap.scaleX = 150/bitmap.getWidth();
	bitmap.scaleY = 150/bitmap.getHeight();
	bitmap.x = (width-bitmap.getWidth())*0.5;
	bitmap.y = parseInt(contentTextObj.y) + parseInt(contentTextObj.getHeight())+20;
	self.addChild(bitmap);
	
	var linkObj = new CLink("http://lufylegend.com/lufylegend",null,"blank","white",null,"15");
	linkObj.x = (width-linkObj.getWidth())*0.5;
	linkObj.y = bitmap.y+bitmap.getHeight();
	self.addChild(linkObj);
	
	var increaseHeight = parseInt(linkObj.getHeight())+parseInt(40);
	
	self._cHeight = linkObj.y+parseInt(increaseHeight);
}