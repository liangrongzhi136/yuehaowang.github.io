function CAboutTester(width){
	var self = this;
	base(self,LSprite,[]);
	
	self._testerList = [
		"Lei Fan",
		"大麦煮小米",
		"Peter Wang",
		"Junjiao Wang",
		"Yixiang Yu"
	];
	
	self._cHeight = 0;
	
	var titleTextObj = new LTextField();
	titleTextObj.weight = "bold";
	titleTextObj.size = 20;
	titleTextObj.color = "white";
	titleTextObj.text = "测试人员";
	titleTextObj.x = (width-titleTextObj.getWidth())*0.5;
	titleTextObj.y = 0;
	self.addChild(titleTextObj);
	
	var index = 0;
	for(var key in self._testerList){
		var contentTextObj = new LTextField();
		contentTextObj.size = 15;
		contentTextObj.width = width;
		contentTextObj.text = self._testerList[key];
		contentTextObj.color = "white";
		contentTextObj.x = (width-contentTextObj.getWidth())*0.5;
		contentTextObj.y = parseInt(titleTextObj.y)+parseInt(titleTextObj.getHeight())+parseInt(index+1)*30;
		self.addChild(contentTextObj);
		index++;
	}
		
	self._cHeight = contentTextObj.y+contentTextObj.getHeight();
}