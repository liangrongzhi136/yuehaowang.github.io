function CSingledTalk(name,content){
	var self = this;
	base(self,LSprite,[]);
	
	self.charaName = name;
	self.content = content;
	
	self.talkBox = new LSprite();
	self.addChild(self.talkBox);
	
	self.textLayer = new LSprite();
	self.addChild(self.textLayer);
	
	self.nameObj = null;
	self.contentObj = null;
	
	self.talkIndex = 0;
	
	self._boxWidth = 400;
	self._boxHeight = 100;
	
	self.startTalk();
}
CSingledTalk.prototype.startTalk = function(){
	var self = this;
	
	self.nameObj = new LTextField();
	self.nameObj.x = 20;
	self.nameObj.y = 10;
	self.nameObj.weight = "bold";
	self.nameObj.size = 20;
	self.textLayer.addChild(self.nameObj);
	
	self.contentObj = new LTextField();
	self.contentObj.x = 20;
	self.contentObj.y = 50;
	self.contentObj.width = self._boxWidth-60;
	self.contentObj.setWordWrap(true,20);
	self.textLayer.addChild(self.contentObj);
	
	self.talkBox.graphics.drawRoundRect(0,"",[0,0,self._boxWidth,self._boxHeight,10],true,"white");
};
CSingledTalk.prototype.nextTalk = function(){
	var self = this;
	
	self.contentObj.text = self.content[self.talkIndex];
	self.nameObj.text = self.charaName[self.talkIndex];
	self.contentObj.wind();
	
	if(self.talkIndex < self.content.length){
		self.talkIndex++;
	}else{
		var so = self.parent.parent.parent;
		self.parent.removeChild(self);
		so.talkObj = null;
		so.talkHint.visible = false;
		if(so.isSingledOver == false){
			so.nextRound();
		}else{
			so.gameOver();
		}
	}
};