function CLaunchSkill(){
	var self = this;
	base(self,LSprite,[]);
	
	self.minScale = 4;
	self.scaleIndex = self.minScale;
	self.maxScale = 5;
	self.scaleDir = "larger";
	
	var bitmapData = new LBitmapData(CGlobal.datalist["launch_skill"]);
	self.bitmap = new LBitmap(bitmapData);
	
	self.bitmap.scaleX = self.scaleIndex/10;
	self.bitmap.scaleY = self.scaleIndex/10;
	self.initWidth = self.bitmap.getWidth();
	self.initHeight = self.bitmap.getHeight();
	self.bitmap.x = -1*(self.bitmap.getWidth() - self.initWidth)*0.5;
	self.bitmap.y = -1*(self.bitmap.getHeight() - self.initHeight)*0.5;
	
	self.addChild(self.bitmap);
	
	self.addEventListener(LMouseEvent.MOUSE_DOWN,self.onClick);
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
CLaunchSkill.prototype.onframe = function(self){
	if(CLock.lockStage)return;
	if(self.scaleDir == "larger"){
		self.scaleIndex += 0.1;
		if(self.scaleIndex >= self.maxScale){
			self.scaleDir = "smaller";
		}
	}else if(self.scaleDir == "smaller"){
		self.scaleIndex -= 0.1;
		if(self.scaleIndex <= self.minScale){
			self.scaleDir = "larger";
		}
	}
	self.bitmap.scaleX = self.scaleIndex/10;
	self.bitmap.scaleY = self.scaleIndex/10;
	self.bitmap.x = -1*(self.bitmap.getWidth() - self.initWidth)*0.5;
	self.bitmap.y = -1*(self.bitmap.getHeight() - self.initHeight)*0.5;
};
CLaunchSkill.prototype.onClick = function(event,self){
	if(CLock.lockStage || CLock.lockCharaOperating)return;
	var parentChara = self.parent.parent;
	parentChara.playSkill();
	
	var effectObj = new CEffect(parentChara.skill.name);
	effectObj.alpha = 0.6;
	parentChara.effectLayer.addChild(effectObj);
	
	effectObj.addCompleteEvent(function(){
		effectObj.rowIndex = 0;
		if(parentChara.isSkillPlay == false){
			effectObj.parent.removeChild(effectObj);
			effectObj = null;
		}
	});
	
	self.parent.removeChild(self);
	self.parent.die();
}