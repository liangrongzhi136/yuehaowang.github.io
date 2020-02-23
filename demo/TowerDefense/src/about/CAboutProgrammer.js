function CAboutProgrammer(width){
	var self = this;
	base(self,LSprite,[]);
	
	self._cHeight = 0;
	
	var titleTextObj = new LTextField();
	titleTextObj.weight = "bold";
	titleTextObj.size = 20;
	titleTextObj.color = "white";
	titleTextObj.text = "程序设计";
	titleTextObj.x = (width-titleTextObj.getWidth())*0.5;
	titleTextObj.y = 0;
	self.addChild(titleTextObj);
	
	var contentTextObj = new LTextField();
	contentTextObj.size = 15;
	contentTextObj.text = "Yorhom Wang";
	contentTextObj.color = "white";
	contentTextObj.x = (width-contentTextObj.getWidth())*0.5;
	contentTextObj.y = parseInt(titleTextObj.y)+parseInt(titleTextObj.getHeight())+30;
	self.addChild(contentTextObj);
	
	self._cHeight = contentTextObj.y+contentTextObj.getHeight();
}