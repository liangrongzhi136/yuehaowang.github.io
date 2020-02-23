function CCharaInfoObject(belong){
	var self = this;
	base(self,LSprite,[]);
	
	self.belong = belong;
	
	self.faceLength = 150;
	
	self.textColor = "white";
	
	//加背景层
	self.backLayer = new LSprite();
	self.backLayer.alpha = 0.8;
	self.backLayer.graphics.drawRect(0,"",[0,0,LStage.width,LStage.height],true,"#191818");
	self.addChild(self.backLayer);
	
	//加入头像层
	self.faceLayer = new LSprite();
	self.faceLayer.x = 50;
	self.faceLayer.y = 50;
	self.addChild(self.faceLayer);
	
	//加入介绍层
	self.introductionLayer = new LSprite();
	self.introductionLayer.x = 50;
	self.introductionLayer.y = 250;
	self.addChild(self.introductionLayer);
	
	//加入属性层
	self.propertyLayer = new LSprite();
	self.propertyLayer.x = 220;
	self.propertyLayer.y = 50;
	self.addChild(self.propertyLayer);
	
	//加入边框
	self.borderObj = new CPageBorder(LStage.width,LStage.height,true);
	self.addChild(self.borderObj);
	
	//显示头像
	self.showFace();
	//显示属性
	self.showProperty();
	//显示介绍
	self.showIntroduction();
	//显示关闭按钮
	self.showCloseButton();
}
CCharaInfoObject.prototype.showIntroduction = function(){
	var self = this;
	
	var textObj = new LTextField();
	textObj.color = self.textColor;
	textObj.size = 18;
	textObj.text = self.belong.introduction;
	textObj.width = LStage.width - 150;
	textObj.setWordWrap(true,30);
	self.introductionLayer.addChild(textObj);
};
CCharaInfoObject.prototype.showCloseButton = function(){
	var self = this;
	var button = new CCloseButton(self.closeInfoPage);
	button.x = LStage.width - button.button.getWidth() - 20;
	button.y = 20;
	self.addChild(button);
};
CCharaInfoObject.prototype.showFace = function(){
	var self = this;
	
	var faceObj = new CFaceObject(self.belong,self.faceLength,self.faceLength);
	self.faceLayer.addChild(faceObj);
};
CCharaInfoObject.prototype.showProperty = function(){
	var self = this;
	
	var charaLevel;
	if(self.belong.level == self.belong.maxLevel){
		charaLevel = "MAX";
	}else{
		charaLevel = self.belong.level;
	}
	
	//加入名称文本
	var nameTextObj = new LTextField();
	nameTextObj.size = 20;
	nameTextObj.text = self.belong.ChineseName;
	nameTextObj.color = self.textColor;
	self.propertyLayer.addChild(nameTextObj);
	//加入等级文本
	var levelTextObj = new LTextField();
	levelTextObj.size = 15;
	levelTextObj.text = "Lv "+charaLevel;
	levelTextObj.color = self.textColor;
	levelTextObj.x = nameTextObj.getWidth() + 30;
	levelTextObj.y = nameTextObj.getHeight() - levelTextObj.getHeight();
	self.propertyLayer.addChild(levelTextObj);
	
	var propertyList = [
		"攻击",
		"能量",
		"范围",
		"军饷",
		"回收",
		"技能",
	];	
	var index = 0;
	var objX = 0;
	
	for(var key in propertyList){
		var propertyObj = new LSprite();
		if((parseInt(key)+1)%4 == 0){
			objX += 300;
			index = 0;
		}
		propertyObj.x = objX;
		propertyObj.y = 30*index + nameTextObj.getHeight() + 30;
		self.propertyLayer.addChild(propertyObj);
		
		var propertyNametextObj = new LTextField();
		propertyNametextObj.text = propertyList[key] + "：";
		propertyNametextObj.color = self.textColor;
		propertyObj.addChild(propertyNametextObj);
		
		var dataBarWidth = 150,dataBarHeight = 10;
		
		var dataBarObj = new LSprite();
		dataBarObj.x = propertyNametextObj.getWidth()+5;
		dataBarObj.y = 5;
		propertyObj.addChild(dataBarObj);
		
		dataBarObj.graphics.drawRoundRect(0,"",[0,0,dataBarWidth,dataBarHeight,5],true,"dimgray");
		
		/**计算属性最大值*/
		var maxAttack = self.belong.maxAtc;
		var maxCost = self.belong.maxCost;
		var maxRange = self.belong.maxRange;
		var maxMp = self.belong.maxMp;
		
		var coStartX = propertyObj.x + propertyObj.parent.x;
		var coStartY = propertyObj.y + propertyObj.parent.y;
		
		/**显示占有部分*/
		if(propertyList[key] == "攻击"){
			var attack;
			if(self.belong.level == self.belong.maxLevel){
				attack = maxAttack >>> 0;
			}else{
				attack = self.belong.attack*self.belong.atcUpgrade >>> 0;
			}
			var barLength = dataBarWidth*(attack/maxAttack) >>> 0;
			var co = LGlobal.canvas.createLinearGradient(coStartX, coStartY, coStartX + barLength, 0);
			co.addColorStop(0.8, "red");
			co.addColorStop(0.4, "orange");
			co.addColorStop(0, "yellow");
		
			dataBarObj.graphics.drawRect(0,"",[1,1,barLength,dataBarHeight-2],true,co);
			
			var amountTextObj = new LTextField();
			amountTextObj.text = attack+"/"+(maxAttack >>> 0);
			amountTextObj.x = dataBarWidth + propertyNametextObj.getWidth() + 20;
			amountTextObj.color = self.textColor;
			propertyObj.addChild(amountTextObj);
		}else if(propertyList[key] == "能量"){
			var mp = self.belong.mp;
			var barLength = dataBarWidth*(mp/maxMp) >>> 0;
			var co = LGlobal.canvas.createLinearGradient(coStartX, coStartY, coStartX + barLength, 0);
			co.addColorStop(0.8, "blue");
			co.addColorStop(0.2, "rgb(40,137,194)");
			co.addColorStop(0.6, "lightblue");
			
			dataBarObj.graphics.drawRect(0,"",[1,1,barLength,dataBarHeight-2],true,co);
			
			var amountTextObj = new LTextField();
			amountTextObj.text = mp+"/"+(maxMp >>> 0);
			amountTextObj.x = dataBarWidth + propertyNametextObj.getWidth() + 20;
			amountTextObj.color = self.textColor;
			propertyObj.addChild(amountTextObj);
		}else if(propertyList[key] == "范围"){
			var range = self.belong.range["range"];
			var barLength = dataBarWidth*(range/maxRange) >>> 0;
			var co = LGlobal.canvas.createLinearGradient(coStartX, coStartY, coStartX + barLength, 0);
			co.addColorStop(0.8, "blue");
			co.addColorStop(0.4, "green");
			co.addColorStop(0.6, "lightgreen");
			
			dataBarObj.graphics.drawRect(0,"",[1,1,barLength,dataBarHeight-2],true,co);
			
			var amountTextObj = new LTextField();
			amountTextObj.text = range+"/"+maxRange;
			amountTextObj.x = dataBarWidth + propertyNametextObj.getWidth() + 20;
			amountTextObj.color = self.textColor;
			propertyObj.addChild(amountTextObj);
		}else if(propertyList[key] == "军饷"){
			propertyObj.removeAllChild();
			var cost;
			if(self.belong.level == self.belong.maxLevel){
				cost = maxCost >>> 0;
			}else{
				cost = self.belong.cost*self.belong.costUpgrade >>> 0;
			}
			var amountTextObj = new LTextField();
			amountTextObj.text = propertyList[key] + "：" + cost+"/"+(maxCost>>>0);
			amountTextObj.color = self.textColor;
			propertyObj.addChild(amountTextObj);
		}else if(propertyList[key] == "回收"){
			propertyObj.removeAllChild();
			
			var amountTextObj = new LTextField();
			amountTextObj.text = propertyList[key] + "：" + self.belong.cost/5;
			amountTextObj.color = self.textColor;
			propertyObj.addChild(amountTextObj);
		}else if(propertyList[key] == "技能"){
			propertyObj.removeAllChild();
			
			if(self.belong.skill == null){
				var amountTextObj = new LTextField();
				amountTextObj.text = propertyList[key] + "：无";
				amountTextObj.color = self.textColor;
				propertyObj.addChild(amountTextObj);
			}else{
				var amountTextObj = new LTextField();
				amountTextObj.text = propertyList[key] + "：";
				amountTextObj.color = self.textColor;
				propertyObj.addChild(amountTextObj);
			
				var skillIcon = new CSkillIcon(self.belong.skill.name);
				skillIcon.x = amountTextObj.getWidth() + 10;
				propertyObj.addChild(skillIcon);
			}
		}
		
		dataBarObj.graphics.drawRoundRect(3,"lightgray",[0,0,dataBarWidth,dataBarHeight,5]);
		index ++;
	}
};
CCharaInfoObject.prototype.closeInfoPage = function(event,self){
	CLock.lockStage = false;
	self.parent.removeChild(self);
};