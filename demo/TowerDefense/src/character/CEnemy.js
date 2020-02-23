function CEnemy(data,style){
	var self = this;
	
	self.route = CGlobal.stage["route"+data.route];
	
	self._startX = self.route["startLoaction"].x*CGlobal.mapLength;
	self._startY = self.route["startLoaction"].y*CGlobal.mapLength;
	
	base(self,CCharacter,[data.name,self._startX,self._startY,style]);
	
	/**添加属性*/
	self.hp = self.data.hp;
	self.hurt = self.data.hurt;
	self.speed = self.data.speed;
	self.value = self.data.value;
	
	self.dir = "down";
	
	self.hpBarLength = 40;
	self.hpBarScale = self.hpBarLength/self.hp;
	
	self.targetIndex = 0;
	
	self.isStealth = false;
	if(self.arms == "shushi"){
		self.isStealth = true;
	}
	self.canAtc = true;
	if(self.arms == "shushi"){
		self.canAtc = false;
	}
	
	self._toX = self.route["route"][0].x*CGlobal.mapLength;
	self._toY = self.route["route"][0].y*CGlobal.mapLength;
	
	self.bitmap = new LBitmap(self.bitmapDataList[self.mode]);
	self.addChild(self.bitmap);
	
	self.hpLayer = new LSprite();
	self.addChild(self.hpLayer);
	self.hpLayer.x = -(self.hpBarLength-self.bitmap.getWidth())/2;
	self.hpLayer.y = -3;
	
	self.showHp();
	CGlobal.candidateEnemy.splice(0,1);
	CGlobal.debutEnemy.push(self);
}
CEnemy.prototype.removeSelf = function(){
	var self = this;
	self.parent.removeChild(self);
	self.die();
	CGlobal.money += self.value;
};
CEnemy.prototype.onframe = function(){
	arguments.callee[SUPER].onframe.call(this);
	var self = this;
	if(self.arms == "shushi"){
		if(CGlobal.ourCharaLayer.childList.length == 0){
			self.isStealth = true;
			self.canAtc = false;
		}
		var isOverfor = false;
		for(var key in CGlobal.ourCharaLayer.childList){
			var o = CGlobal.ourCharaLayer.childList[key];

			var oObj = new CShape();
			oObj.setArc(o.getRootCoordinate().x+24,o.getRootCoordinate().y+24,o.realRangeLayer.getWidth()/2);
			var eObj = new CShape();
			eObj.setRectangle(self.getRootCoordinate().x,self.getRootCoordinate().y,self.bitmap.getWidth(),self.bitmap.getHeight());
			
			if(CGlobal.hitTestRectArc(eObj,oObj,false) == true && o.arms == "shushi"){
				self.isStealth = false;
				self.canAtc = true;
				isOverfor = true;
			}else{
				self.isStealth = true;
				self.canAtc = false;
			}
			
			if(isOverfor == true)break;
		}
	}
	if(self.isStealth == true){
		self.alpha = 0.5;
	}else if(self.isStealth == false && self.arms == "shushi"){
		self.alpha = 1;
	}
	self.move();
};
CEnemy.prototype.move = function(){
	var self = this;
	
	if(self.route == null)return;
	if(self.x == self._toX && self.y == self._toY){
		if(self.targetIndex == self.route["route"].length){
			self.route = null;
			self._toX = self.x;
			self._toY = self.y;
			self.parent.removeChild(self);
			self.die();
			
			CGlobal.life -= self.hurt;
			if(CGlobal.life <= 0){
				CGlobal.gameOver();
				return;
			}
			if(CGlobal.enemyCharaLayer.childList.length == 0){
				CGlobal.isAddEnemy = true;
				CGlobal.isNextWave = false;
			}
			return;
		}else{
			self._toX = self.route["route"][self.targetIndex].x*CGlobal.mapLength;
			self._toY = self.route["route"][self.targetIndex].y*CGlobal.mapLength;
			self.targetIndex += 1;
		}
	}
	if(self._toX > self.x){
		self.dir = "right";
		var tx = self.x+self.speed;
		if(tx > self._toX){
			self.x = self._toX;
		}else{
			self.x = tx;
		}
	}else if(self._toY > self.y){
		self.dir = "down";
		var ty = self.y+self.speed;
		if(ty > self._toY){
			self.y = self._toY;
		}else{
			self.y = ty;
		}
	}else if(self._toX < self.x){
		self.dir = "left";
		var tx = self.x - self.speed;
		if(tx < self._toX){
			self.x = self._toX;
		}else{
			self.x = tx;
		}
	}else if(self._toY < self.y){
		self.dir = "up";
		var ty = self.y-self.speed;
		if(ty < self._toY){
			self.y = self._toY;
		}else{
			self.y = ty;
		}
	}
};
CEnemy.prototype.showHp = function(){
	var self = this;
	
	self.hpLayer.graphics.clear();
	self.hpLayer.graphics.drawRoundRect(0,"",[0,0,self.hp*self.hpBarScale,5,4],true,"#00ff00");
};