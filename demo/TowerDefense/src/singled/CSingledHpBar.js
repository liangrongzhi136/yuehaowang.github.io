function CSingledHpBar(){
	var self = this;
	base(self,LSprite,[]);
	
	self.value = 100;
	self.cutProgress = 0;
	self.toValue = self.value;
	
	self._barWidth = 20;
	self._barHeight = 100;
	
	self._showScale = self._barHeight/self.value;
	
	self.borderLayer = new LSprite();
	self.borderLayer.graphics.drawRect(5,"white",[0,0,self._barWidth,self._barHeight],true,"#191818");
	
	self.hpLayer = new LSprite();
	self.hpLayer.graphics.drawRect(0,"",[0, self._barHeight-self.value*self._showScale, self._barWidth, self.value*self._showScale],true,"red");
	self.hpLayer.mask = self.borderLayer;
	self.addChild(self.hpLayer);
	
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
CSingledHpBar.prototype.setHp = function(v){
	var self = this;
	
	self.cutProgress = v/5;
	self.toValue = self.value-v;
};
CSingledHpBar.prototype.onframe = function(self){
	if(self.toValue == self.value)return;
	self.value -= self.cutProgress;
	self.hpLayer.graphics.clear();
	self.hpLayer.graphics.drawRect(0,"",[0, self._barHeight-self.value*self._showScale, self._barWidth, self.value*self._showScale],true,"red");
};