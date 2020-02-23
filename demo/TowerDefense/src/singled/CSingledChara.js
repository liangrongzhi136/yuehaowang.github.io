function CSingledChara(data,x,y,style){
	var self = this;
	base(self,CCharacter,[data,x,y,style]);
	
	self.belong = "";
	
	self.isFrameRun = true;
	
	self._startX = x;
	self._startY = y;
	
	self._toX = null;
	self.moveSpeed = 7;
	
	self.isStop = false;
	self.isClash = false;
	self.isMoveComplete = false;
	self.isNextRound = true;
	
	self.enemy = null;
	self.hpBar = null;
	
	self.bitmap = new LBitmap(self.bitmapDataList[self.mode]);
	self.addChild(self.bitmap);
}
CSingledChara.prototype.onframe = function(){
	var self = this;
	
	if(self.frameIndex++ < self.maxFrame)return;
	self.frameIndex = 0;
	
	if(self.isFrameRun == true){
		if(self.mode == "atc"){
			self.sy = 64;
			self.isFrameRun = false;
			if(self.lastMode != self.mode){
				self.bitmap.x -= 8;
				self.bitmap.y -= 8;

				self.isStop = true;
			}
		}else{
			self.sy = 48;
			self.isFrameRun = true;
			if(self.lastMode != self.mode){
				self.bitmap.x += 8;
				self.bitmap.y += 8;
				
				self.isStop = false;
			}
		}
	}

	if(self.lastMode != self.mode){
		self.rowIndex = animationData[self.mode][self.dir][0];
		self.lastMode = self.mode;
		self.isClash = !self.isClash;
	}
	if(self.lastDir != self.dir){
		self.rowIndex = animationData[self.mode][self.dir][0];
		self.lastDir = self.dir;
	}
	if(animationData[self.mode][self.dir][2] == true){
		self.bitmap.scaleX = -1;
	}else{
		self.bitmap.scaleX = 1;
	}
	
	self.bitmap.bitmapData = self.bitmapDataList[self.mode];
	self.bitmap.bitmapData.setCoordinate(0,self.rowIndex*self.sy);
	
	if(self.isStop == true)return;
	if(self.rowIndex++ >= animationData[self.mode][self.dir][1]){
		self.rowIndex = animationData[self.mode][self.dir][0];
		self.onComplete();
	}
	if(self._toX != null)self.move();
};
CSingledChara.prototype.move = function(){
	var self = this;
	
	if(self.dir == "right"){
		if(self._toX > self.x){
			if(self._toX < self.x + self.moveSpeed){
				self.x = self._toX;
			}else{
				self.x += self.moveSpeed;
			}
		}else{
			self._toX = null;
			if(self._onMoveComplete != null && self.isMoveComplete == false){
				self.isMoveComplete = true;
				self._onMoveComplete();
			}
		}
	}else if(self.dir == "left"){
		if(self._toX < self.x){
			if(self._toX > self.x - self.moveSpeed){
				self.x = self._toX;
			}else{
				self.x -= self.moveSpeed;
			}
		}else{
			self._toX = null;
			if(self._onMoveComplete != null && self.isMoveComplete == false){
				self.isMoveComplete = true;
				self._onMoveComplete();
			}
		}
	}
};
CSingledChara.prototype.moveTo = function(n,f){
	var self = this;
	self._toX = n;
	self._onMoveComplete = f;
	self.isMoveComplete = false;
	self.isNextRound = true;
};
CSingledChara.prototype.setEnemy = function(o){
	this.enemy = o;
};
CSingledChara.prototype.setHpBar = function(o){
	this.hpBar = o;
};
CSingledChara.prototype.onComplete = function(){
	var self = this;
	
	self.isFrameRun = true;
	
	if(self.isClash == true){
		self.mode = "move";
		
		var enemy = self.enemy;
		enemy.hpBar.setHp(20);
		
		self.moveTo(self.enemy._startX,function(){
			if(self.dir == "right"){
				self.dir = "left";
			}else{
				self.dir = "right";
			}
			self._startX = self.x;
			if(self.enemy.isMoveComplete == true && self.isNextRound == true){
				if(enemy.hpBar.toValue <= 0){
					var so = enemy.parent.parent.parent;
					so.isSingledOver = true;
					if(enemy.name == so.enemyObj.name){
						so.winner = so.ourObj;
						so.loser = so.enemyObj;
						so.addTalk("win");
					}else{
						so.winner = so.enemyObj;
						so.loser = so.ourObj;
						so.addTalk("lose");
					}
				}else if(self.hpBar.toValue <= 0){
					var so = self.parent.parent.parent;
					so.isSingledOver = true;
					if(self.name == so.ourObj.name){
						so.winner = so.enemyObj;
						so.loser = so.ourObj;
						so.addTalk("win");
					}else{
						so.winner = so.ourObj;
						so.loser = so.enemyObj;
						so.addTalk("lose");
					}
				}else{
					enemy.parent.parent.parent.nextRound();
					enemy.enemy.isNextRound = false;
				}
			}
		});
		
		enemy.moveTo(enemy.enemy._startX,function(){
			if(enemy.dir == "right"){
				enemy.dir = "left";
			}else{
				enemy.dir = "right";
			}
			enemy._startX = enemy.x;
			if(enemy.enemy.isMoveComplete == true && enemy.isNextRound == true){
				if(enemy.hpBar.toValue <= 0){
					var so = enemy.parent.parent.parent;
					so.isSingledOver = true;
					if(enemy.name == so.enemyObj.name){
						so.winner = so.ourObj;
						so.loser = so.enemyObj;
						so.addTalk("win");
					}else{
						so.winner = so.enemyObj;
						so.loser = so.ourObj;
						so.addTalk("lose");
					}
				}else if(self.hpBar.toValue <= 0){
					var so = self.parent.parent.parent;
					so.isSingledOver = true;
					if(self.name == so.ourObj.name){
						so.winner = so.enemyObj;
						so.loser = so.ourObj;
						so.addTalk("win");
					}else{
						so.winner = so.ourObj;
						so.loser = so.enemyObj;
						so.addTalk("lose");
					}
				}else{
					enemy.parent.parent.parent.nextRound();
					enemy.enemy.isNextRound = false;
				}
			}
		});
	}
};