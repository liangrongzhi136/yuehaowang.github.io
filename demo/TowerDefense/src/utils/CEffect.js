function CEffect(type){
	var self = this;
	base(self,LSprite,[]);
	
	self.effectType = type;
	self.rowIndex = 0;
	self.maxRow = 0;
	self.sy = 64;
	
	self.frameIndex = 0;
	self.maxFrame = 1;
	
	self.onComplete = null;
	
	self.bitmapDataList = {
		"怒气":new LBitmapData(CGlobal.datalist["fire_globe"],0,0,64,64),
		"神速":new LBitmapData(CGlobal.datalist["blue_swirl"],0,0,64,64),
		"强袭":new LBitmapData(CGlobal.datalist["red_swirl"],0,0,64,64),
		"蓄力":new LBitmapData(CGlobal.datalist["yellow_swirl"],0,0,64,64)
	};
	
	self.bitmap = new LBitmap(self.bitmapDataList[self.effectType]);
	self.addChild(self.bitmap);
	
	self.maxRow = self.bitmap.bitmapData.image.height/64;
	
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
CEffect.prototype.onframe = function(self){
	if(CLock.lockStage)return;
	if(self.frameIndex++ > self.maxFrame)return;
	self.frameIndex = 0;
	self.bitmap.bitmapData.setCoordinate(0,self.rowIndex*self.sy);
	if(self.rowIndex++ > self.maxRow){
		if(self.onComplete != null)self.onComplete();
	}
};
CEffect.prototype.addCompleteEvent = function(f){
	this.onComplete = f;
};