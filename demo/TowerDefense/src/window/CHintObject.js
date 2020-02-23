function CHintObject(content){
	var self = this;
	base(self,LSprite,[]);
	
	self.content = content;
	
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	self.textLayer = new LSprite();
	self.addChild(self.textLayer);
	
	var textObj = new LTextField();
	textObj.size = 12;
	textObj.text = content;
	textObj.x = 20;
	textObj.y = 5;
	textObj.color = "white";
	self.textLayer.addChild(textObj);
	
	self.backLayer.graphics.drawRoundRect(0,"",[0,0,textObj.getWidth()+40,textObj.getHeight()+20,5],true,"#333333");
	
	self._startX = (LStage.width-self.getWidth())/2;
	self._startY = 100;
	
	self.x = self._startX;
	self.y = self._startY;
	self.alpha = 0;
	
	CGlobal.hintLayer.addChild(self);
	
	self._changeSelf();
}
CHintObject.prototype._changeSelf = function(x,y){
	var self = this;
	
	var x = self._startX,
	y = self._startY;
	
	self.tweenLite = new $LTweenLite();
	self.addChild(self.tweenLite);
	
	self.tweenLite.to(self,1,{
		alpha:1,
		x:x,
		y:y-50,
		onComplete:function(o){
			self.tweenLite.to(o,1,{
				alpha:0,
				delay:0.3,
				x:x,
				y:y-100,
				onComplete:function(o){
					o.removeAllChild();
					o.parent.removeChild(o);
				}
			});
		}
	});
};