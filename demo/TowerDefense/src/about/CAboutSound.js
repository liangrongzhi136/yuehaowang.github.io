function CAboutSound(width){
	var self = this;
	base(self,LSprite,[]);
	
	self._soundList = {
		"Welcome to China":"战场背景音乐",
		"Tetsujin drive":"选关界面背景音乐",
		"Dawn of the wish":"关于界面背景音乐",
		"A way away":"武将一览背景音乐",
		"Glage at the world":"开场界面背景音乐"
	};
	
	self._cHeight = 0;
	
	var titleTextObj = new LTextField();
	titleTextObj.weight = "bold";
	titleTextObj.size = 20;
	titleTextObj.color = "white";
	titleTextObj.text = "游戏音乐";
	titleTextObj.x = (width-titleTextObj.getWidth())*0.5;
	titleTextObj.y = 0;
	self.addChild(titleTextObj);
	
	var index = 0;
	for(var key in self._soundList){
		var contentLayer = new LSprite();
		self.addChild(contentLayer);
		
		var lineText = new LTextField();
		lineText.size = 15;
		lineText.text = " —— ";
		lineText.color = "white";
		lineText.x = (width-lineText.getWidth())*0.5;
		lineText.y = parseInt(titleTextObj.y)+parseInt(titleTextObj.getHeight())+parseInt(index+1)*30;
		contentLayer.addChild(lineText);
		
		var musicNameTextObj = new LTextField();
		musicNameTextObj.size = 15;
		musicNameTextObj.width = width;
		musicNameTextObj.text = key;
		musicNameTextObj.color = "white";
		musicNameTextObj.x = lineText.x;
		musicNameTextObj.y = lineText.y;
		musicNameTextObj.textAlign = "right";
		contentLayer.addChild(musicNameTextObj);
		
		var belongNameTextObj = new LTextField();
		belongNameTextObj.size = 15;
		belongNameTextObj.width = width;
		belongNameTextObj.text = self._soundList[key];
		belongNameTextObj.color = "white";
		belongNameTextObj.x = lineText.x+lineText.getWidth();
		belongNameTextObj.y = lineText.y;
		contentLayer.addChild(belongNameTextObj);
		
		index++;
	}
	
	self._cHeight = belongNameTextObj.y+belongNameTextObj.getHeight();
}