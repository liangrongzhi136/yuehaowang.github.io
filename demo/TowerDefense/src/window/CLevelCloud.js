function CLevelCloud(){
	var self = this;
	base(self,LSprite,[]);
	
	var bitmapData = new LBitmapData(CGlobal.datalist["domestic_clouds"]);
	self.bitmap = new LBitmap(bitmapData);
	self.addChild(self.bitmap);
	
	self.moveSpeed = 5;
	
	self.init();
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
CLevelCloud.prototype.init = function(){
	var self = this;
		
	self.x = 0-self.getWidth();
	self.y = self.getRandomY(50,LStage.height-200);
};
CLevelCloud.prototype.getRandomY = function(minNum,maxNum){
	var c = maxNum-minNum+1;  
    return Math.floor(Math.floor(Math.random() * c + minNum));
};
CLevelCloud.prototype.onframe = function(self){
	self.x += self.moveSpeed;
	if(self.x >= LStage.width+20){
		self.init();
	}
};