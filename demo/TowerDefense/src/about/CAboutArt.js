function CAboutArt(width){
	var self = this;
	base(self,LSprite,[]);
	
	self._cHeight = 0;
	
	var titleTextObj = new LTextField();
	titleTextObj.weight = "bold";
	titleTextObj.size = 20;
	titleTextObj.color = "white";
	titleTextObj.text = "游戏素材";
	titleTextObj.x = (width-titleTextObj.getWidth())*0.5;
	titleTextObj.y = 0;
	self.addChild(titleTextObj);
	
	var contentTextObj = new LTextField();
	contentTextObj.size = 15;
	contentTextObj.width = width;
	contentTextObj.text = "本游戏素材大多数来自网络（轩辕春秋，IconArchive），部分为指尖生执念制作。在此表示对各位无私的网友提供这么优秀的素材表示感谢。";
	contentTextObj.color = "white";
	contentTextObj.y = parseInt(titleTextObj.y)+parseInt(titleTextObj.getHeight())+30;
	self.addChild(contentTextObj);
	
	var line = parseFloat(contentTextObj.getWidth()/width);
	contentTextObj.x = (width - contentTextObj.getWidth()/line)*0.5;
	var increaseHeight = Math.floor(line)*30-20;
	contentTextObj.setWordWrap(true,30);
	
	self._cHeight = contentTextObj.y+parseInt(contentTextObj.getHeight())+parseInt(increaseHeight);
}