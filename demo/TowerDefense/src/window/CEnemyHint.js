function CEnemyHint(data){
	var self = this;
	base(self,LSprite,[]);
	
	self.name = "CEnemyHint";
	self.data = data;
	
	self.timeIndex = 0;
	self.maxTime = 60;
	
	self.kind = new Array();
	
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	
	self.charaLayer = new LSprite();
	self.charaLayer.x = 20;
	self.charaLayer.y = 20;
	self.addChild(self.charaLayer);
	
	self.textLayer = new LSprite();
	self.textLayer.x = 20;
	self.textLayer.y = 20;
	self.addChild(self.textLayer);
	
	self.arrowLayer = new LSprite();
	CGlobal.enemyHintLayer.addChild(self.arrowLayer);
		
	CGlobal.enemyHintLayer.addChild(self);
	self.addChara();
	self.addBack();
	self.addArrow();
	
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
}
CEnemyHint.prototype.onframe = function(self){
	if(self.timeIndex ++ > self.maxTime){
		CGlobal.isShowEnemyHint = true;
		self.parent.removeChild(self.arrowLayer);
		self.parent.removeChild(self);
		CGlobal.arrowHintList = [];
	}
};
CEnemyHint.prototype.addBack = function(){
	var self = this;
	
	var width = parseInt(self.charaLayer.getWidth()*self.kind.length)+40;
	var height = parseInt(self.charaLayer.getHeight())+parseInt(self.textLayer.getHeight())+80;
	self.backLayer.graphics.drawRoundRect(0,"",[0,0,width,height,10],true,"#333333");
	self.backLayer.alpha = 0.9;
	
	self.x = (LStage.width - self.backLayer.getWidth())*0.5;
	self.y = (LStage.height - self.backLayer.getHeight())*0.5;
};
CEnemyHint.prototype.addChara = function(){
	var self = this;
	
	var lastOne = null;
	
	for(var key in self.data){
		if(lastOne != null){
			if(self.data[key].name == lastOne.name){
				continue;
			}else{
				lastOne = self.data[key];
				self.kind.push({obj:self.data[key],amount:0});
			}
		}else{
			self.kind.push({obj:self.data[key],amount:0});
			lastOne = self.data[key];
		}
	}
	for(var i in self.kind){
		for(var j in self.data){
			if(self.data[j].name == self.kind[i].obj.name){
				self.kind[i].amount ++;
			}
		}
	}
	for(var k in self.kind){
		if(charaData[self.kind[k].obj.name].attribute == "soldier"){
			var bitmapData = new LBitmapData(CGlobal.datalist[self.kind[k].obj.name+CGlobal.soldierStyle["enemy"]+"_move"],0,0,48,48);
		}else{
			var imgname = self.kind[k].obj.name;
			if(charaData[self.kind[k].obj["name"]].isNormal == true)imgname = "normal"+charaData[self.kind[k].obj["name"]].normalStyle;
			var bitmapData = new LBitmapData(CGlobal.datalist[imgname+"_move"],0,0,48,48);			
		}
		var bitmap = new LBitmap(bitmapData);
		bitmap.x = parseInt(k * bitmap.getWidth());
		self.charaLayer.addChild(bitmap);
		
		var nameObj = new LTextField();
		nameObj.text = charaData[self.kind[k].obj["name"]].name;
		nameObj.color = "white";
		nameObj.x = parseInt(bitmap.x) + (bitmap.getWidth()-nameObj.getWidth())*0.5;
		nameObj.y = parseInt(bitmap.getHeight())+10;
		self.textLayer.addChild(nameObj);
		
		var amountObj = new LTextField();
		amountObj.text = "×"+self.kind[k].amount;
		amountObj.color = "white";
		amountObj.x = parseInt(bitmap.x) + (bitmap.getWidth()-amountObj.getWidth())*0.5;
		amountObj.y = parseInt(bitmap.getHeight())+30;
		self.textLayer.addChild(amountObj);
	}
};
CEnemyHint.prototype.addArrow = function(){
	var self = this;
	
	var lastOne = null;
	var wayList = new Array();
	for(var key in self.data){
		if(lastOne != null){
			if(self.data[key].route == lastOne){
				continue;
			}else{
				lastOne = self.data[key].route;
				wayList.push(self.data[key].route);
			}
		}else{
			wayList.push(self.data[key].route);
			lastOne = self.data[key].route;
		}
	}

	for(var i=0; i<wayList.length; i++){
		var so = CGlobal.stage["route"+wayList[i]].startLoaction;
		var data = {x:so.x*CGlobal.mapLength, y:so.y*CGlobal.mapLength};
		var arrow = new CEnemyHintArrow(data,self.arrowLayer);
		CGlobal.arrowHintList.push(arrow);
	}
};