function CCharacter(data,x,y,style){
	var self = this;
	base(self,LSprite,[]);
	
	self.name = data;
	
	self.x = x;
	self.y = y;
	
	self.sx = 48;
	self.sy = 48;
		
	self.mode = "move";
	self.lastMode = self.mode;
	self.dir = "down";
	self.lastDir = self.dir;
	self.rowIndex = 0;
	self.colIndex = 0;
	
	/**基本属性初始化*/
	self.data = {};
	for(var key in charaData[data]){
		self.data[key] = charaData[data][key];
	}
	self.attack = self.data.attack;
	self.ChineseName = self.data.name;
	self.introduction = self.data.introduction;
	self.arms = self.data.arms;
	self.attribute = self.data.attribute;
	self.isNormal = self.data.isNormal;
	self.normalStyle = self.data.normalStyle;
	self.mpGiven = self.data.mpGiven;
	
	self.frameIndex = 0;
	self.maxFrame = 1;
	
	if(self.attribute == "soldier"){
		self.bitmapDataList = {
			move:new LBitmapData(CGlobal.datalist[data+style+"_move"],0,0,48,48),
			atc:new LBitmapData(CGlobal.datalist[data+style+"_attack"],0,0,64,64)
		};
	}else{
		var dataname = data;
		if(self.isNormal == true)dataname = "normal"+self.normalStyle;
		self.bitmapDataList = {
			move:new LBitmapData(CGlobal.datalist[dataname+"_move"],0,0,48,48),
			atc:new LBitmapData(CGlobal.datalist[dataname+"_attack"],0,0,64,64)
		};
	}
}
CCharacter.prototype.onframe = function(){
	var self = this;
	
	if(self.frameIndex++ < self.maxFrame)return;
	self.frameIndex = 0;
	
	if(self.lastDir != self.dir){
		self.rowIndex = animationData[self.mode][self.dir][0];
		self.lastDir = self.dir;
	}
	if(animationData[self.mode][self.dir][2] == true){
		self.bitmap.scaleX = -1;
	}else{
		self.bitmap.scaleX = 1;
	}
	
	self.bitmap.bitmapData.setCoordinate(0,self.rowIndex*self.sy);
	
	if(self.rowIndex++ >= animationData[self.mode][self.dir][1]){
		self.rowIndex = animationData[self.mode][self.dir][0];
		self.onComplete();
	}
};
CCharacter.prototype.onComplete = function(){};