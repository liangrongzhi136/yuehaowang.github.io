function CFaceObject(belong,width,height){
	var self = this;
	base(self,LSprite,[]);
	
	self.belong = belong;
	self.belongName = belong.name;
	self._fWidth = width;
	self._fHeight = height;
	
	var bitmapdata = new LBitmapData(CGlobal.datalist["menu_back"]);
	var bitmap = new LBitmap(bitmapdata);
	bitmap.scaleX = self._fWidth/bitmap.getWidth();
	bitmap.scaleY = self._fHeight/bitmap.getHeight();
	self.addChild(bitmap);
	
	//获取头像图片
	var faceName;
	if(self.belong.isNormal == true){
		faceName = "normal"+self.belong.normalStyle;
	}else if(self.belong.attribute == "soldier"){
		faceName = "bing";
	}else{
		faceName = self.belongName;
	}
	//显示头像图片
	var bitmapdata = new LBitmapData(CGlobal.datalist[faceName+"_face"]);
	var bitmap = new LBitmap(bitmapdata);
	self.addChild(bitmap);
	//拉伸头像
	var scaleValue = self._fHeight/bitmap.getHeight();
	bitmap.scaleX = scaleValue;
	bitmap.scaleY = scaleValue;
	
	//加入边框
	var borderObj = new CPageBorder(self._fWidth,self._fHeight,false);
	self.addChild(borderObj);
	
	//加入遮罩
	var faceMaskLayer = new LSprite();
	faceMaskLayer.graphics.drawRect(0,"",[self.x-1,self.y-1,self._fWidth+2,self._fHeight+1],true,"transparent");
	self.mask = faceMaskLayer;
}