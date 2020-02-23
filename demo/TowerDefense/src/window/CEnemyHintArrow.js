function CEnemyHintArrow(outset,parent){
	var self = this;
	base(self,LSprite,[]);
	
	/**闪烁频率*/
	self.frameIndex = 0;
	self.maxFrame = 5;
	
	//保存&设置出口位置
	self.outset = outset;
	self.ox = self.outset.x;
	self.oy = self.outset.y;
	self.resetOutset();
	//加入显示列表
	parent.addChild(self);
	
	self.distanceX = 0;
	self.distanceY = 0;

	/**加入图片*/
	self.bitmap = new LBitmap(new LBitmapData(CGlobal.datalist["golden_arrow"]));
	self.bitmap.scaleX = 1.5;
	self.bitmap.scaleY = 1.5;
	self.addChild(self.bitmap);
	
	/**计算箭头位置*/
	var outsetX = self.outset.x;
	var outsetY = self.outset.y;
	var xd = 80;
	var yd = 80;
		
	if(self.outset.x >= LGlobal.width-CGlobal.menuWidth){
		outsetX = LGlobal.width-CGlobal.menuWidth-CGlobal.mapLength;
	}else if(self.outset.x <= Math.abs(CGlobal.backLayer.x)){
		outsetX = Math.abs(CGlobal.backLayer.x)-CGlobal.mapLength;
	}
	
	if(self.outset.y >= LGlobal.height){
		outsetY = LGlobal.height-CGlobal.mapLength;
	}else if(self.outset.y <= Math.abs(CGlobal.backLayer.x)){
		outsetY = Math.abs(CGlobal.backLayer.x)-CGlobal.mapLength;
	}
	
	if(outsetX < LGlobal.width/2){
		self.x = outsetX+xd;
	}else{
		self.x = outsetX-xd;
	}
	if(outsetY < LGlobal.height/2){
		self.y = outsetY+yd;
	}else{
		self.y = outsetY-yd;
	}

	/**旋转箭头*/
	self.rotateSelf();
	
	/**加入时间轴事件*/
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
CEnemyHintArrow.prototype.rotateSelf = function(){
	var self = this;

	/**计算当前位置与出口夹角*/
	self.getDistance();
	self._angle = Math.atan2(self.distanceY,self.distanceX);
	
	self.rotate = Math.floor(-(self._angle*(180/Math.PI))-90);
};
CEnemyHintArrow.prototype.getDistance = function(){
	var self = this;

	self.distanceX = self.x-self.outset.x;
	self.distanceY = self.outset.y-self.y;
};
CEnemyHintArrow.prototype.onframe = function(self){
	if(self.frameIndex++ < self.maxFrame)return;
	self.bitmap.visible = !self.bitmap.visible;
	self.frameIndex = 0;
};
CEnemyHintArrow.prototype.resetOutset = function(){
	var self = this;
	
	self.outset.x = self.ox+CGlobal.backLayer.x;
	self.outset.y = self.oy+CGlobal.backLayer.y;
};