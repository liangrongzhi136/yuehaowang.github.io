function CPageBorder(width,height,isAddDecoration){
	var self = this;
	base(self,LSprite,[]);
	
	/**加入左右边框*/
	var bitmapdata = new LBitmapData(CGlobal.datalist["border_left"]);
	var bitmap = new LBitmap(bitmapdata);
	bitmap.x = -2;
	bitmap.scaleY = height/bitmap.getHeight();
	self.addChild(bitmap);
	
	var bitmapdata = new LBitmapData(CGlobal.datalist["border_left"]);
	var bitmap = new LBitmap(bitmapdata);
	bitmap.x = width-bitmap.getWidth()+7;
	bitmap.scaleY = height/bitmap.getHeight();
	self.addChild(bitmap);
	
	/**加入上下边框*/
	var bitmapdata = new LBitmapData(CGlobal.datalist["border_top"]);
	var bitmap = new LBitmap(bitmapdata);
	bitmap.y = -1;
	bitmap.scaleX = width/bitmap.getWidth();
	self.addChild(bitmap);
	
	var bitmapdata = new LBitmapData(CGlobal.datalist["border_top"]);
	var bitmap = new LBitmap(bitmapdata);
	bitmap.y = height-bitmap.getHeight()+6;
	bitmap.scaleX = width/bitmap.getWidth();
	self.addChild(bitmap);
	
	if(isAddDecoration){
		/**加入装饰**/
		var bitmapdata = new LBitmapData(CGlobal.datalist["border_decoration"],280,90,230,65);
		var bitmap = new LBitmap(bitmapdata);
		bitmap.y = height-bitmap.getHeight()+4;
		self.addChild(bitmap);
		
		var bitmapdata = new LBitmapData(CGlobal.datalist["border_decoration"],280,90,230,65);
		var bitmap = new LBitmap(bitmapdata);
		bitmap.x = width-bitmap.getWidth();
		bitmap.y = -4;
		bitmap.scaleY = -1;
		bitmap.scaleX = -1;
		self.addChild(bitmap);
	}
	
	var maskLayer = new LSprite();
	maskLayer.graphics.drawRect(0,"",[-1,-1,width+2,height+2],true,"transparent");
	self.mask = maskLayer;
}