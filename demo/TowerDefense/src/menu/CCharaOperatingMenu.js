function CCharaOperatingMenu(data,parent){
	var self = this;
	base(self,LSprite,[]);
	
	parent.addChild(self);
	
	self.buttonCoodList = {
		"升级": {x:0,y:-84},
		"信息": {x:84,y:0},
		"移除": {x:-84,y:0}
	}
	
	self.menuData = data;
	self.showOperatingList();
}
CCharaOperatingMenu.prototype.showOperatingList = function(){
	var self = this;
	
	for(var key in self.menuData){
		self.addButton(self.menuData[key]);
	}
};
CCharaOperatingMenu.prototype.addButton = function(data){
	var self = this;
	
	var layer = new LSprite();
	layer.x = self.buttonCoodList[data.name].x;
	layer.y = self.buttonCoodList[data.name].y;
	self.addChild(layer);
	
	var bitmapData = new LBitmapData(CGlobal.datalist[data.img],0,0,48,48);
	var bitmap = new LBitmap(bitmapData);
	layer.addChild(bitmap);
	
	layer.addEventListener(LMouseEvent.MOUSE_DOWN,function(event){
		if(CLock.lockStage || CLock.lockCharaOperating)return;
		self.parent.parent.menuOperating(data.name);
	});
};