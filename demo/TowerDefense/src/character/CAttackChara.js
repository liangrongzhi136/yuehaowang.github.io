function CAttackChara(data,x,y,style){
	var self = this;
	base(self,CCharacter,[data,x,y,style]);
	
	/**添加属性*/
	self.cost = self.data.cost;
	self.range = {};
	for(var key in charaData[data]["range"]){
		self.range[key] = charaData[data]["range"][key];
	}
	self.mp = 0;
	self.skill = skillData[self.data.skill];
	self.mpUpgrade = self.data.mpUpgrade;
	//保存可攻击目标列表
	self.targetList = armsData[self.arms].target;
	//保存升级后的样式
	self.levelUpStyle = self.data.levelUpStyle;
	
	//范围是否处于显示状态
	self.isShowRange = false;
	//是否动画播放完成一次
	self.isFrameRun = true;
	
	/**显示范围层*/
	self.showRangeLayer = new LSprite();
	self.showRangeLayer.alpha = 0.5;
	self.addChild(self.showRangeLayer);
	/**实际范围层*/
	self.realRangeLayer = new LSprite();
	self.addChild(self.realRangeLayer);
	/**人物图片层*/
	self.bitmapLayer = new LSprite();
	self.addChild(self.bitmapLayer);
	self.bitmap = new LBitmap(self.bitmapDataList[self.mode]);
	self.bitmapLayer.addChild(self.bitmap);
	/**菜单层*/
	self.menuLayer = new LSprite();
	self.addChild(self.menuLayer);
	/**触发技能层*/
	self.launchSkillLayer = new LSprite();
	self.addChild(self.launchSkillLayer);
	/**特效层*/
	self.effectLayer = new LSprite();
	self.effectLayer.x = -8;
	self.effectLayer.y = -8;
	self.addChild(self.effectLayer);
	
	/**等级相关属性*/
	self.level = 1;
	self.maxLevel = self.data.maxLevel;
	
	/**升级属性提升值*/
	self.atcUpgrade = 1.2;
	self.costUpgrade = 1.5;
	self.rangeUpgrade = 0.5;
	
	/**基本不可变属性*/
	if(self.attribute == "soldier"){
		self.maxAtc = self.attack*Math.pow(self.atcUpgrade,self.maxLevel);
		self.maxCost = self.cost*Math.pow(self.costUpgrade,self.maxLevel);
		self.maxRange = self.range["range"] + self.rangeUpgrade*(self.maxLevel-1);
	}else{
		self.maxAtc = self.attack;
		self.maxCost = self.cost;
		self.maxRange = self.range["range"];
	}
	self.maxMp = 100;
	
	//攻击目标
	self.atcTarget = null;
	
	//是否开启技能状态
	self.isSkillPlay = false;
	//是否已显示提示mp已满的图标
	self.isShowMpHint = false;
	//控制技能时间的属性
	self.skillFrameIndex = 0;
	self.skillMaxFrame = 100;
	
	//杀敌数
	self.kills = 0;
	
	//绘画攻击范围
	if(self.range["type"] == "circle"){
		self.realRangeLayer.graphics.drawArc(0,"",[24,24,self.range["range"]*CGlobal.mapLength,0,2*Math.PI],true,"transparent");
	}
	
	//扣除金币
	CGlobal.money -= self.cost;
	
	//放入出场列表
	CGlobal.ourCharaList.debut.push(self);
	
	//加入提示信息
	var hintObj = new CHintObject(self.ChineseName+"部署成功！耗费"+self.data.cost+"金币");
}
CAttackChara.prototype.menuOperating = function(t){
	var self = this;
	switch(t){
		case "升级":
			if(CGlobal.isCostMoney(self.cost*1.5) && self.isMaxLevel(self.level+1)){
				self.levelUp();
			}
			break;
		case "移除":
			self.withdraw();
			break;
		case "信息":
			self.showInfo();
			break;
	}
};
CAttackChara.prototype.showInfo = function(){
	var self = this;
	
	CLock.lockStage = true;
	var infoObj = new CCharaInfoObject(self);
	CGlobal.charaInfoLayer.addChild(infoObj);
}
CAttackChara.prototype.levelUp = function(){
	var self = this;
	
	self.level += 1;
	
	//更新形象
	self.updateImg();
	//加入提示信息
	var hintObj = new CHintObject(self.ChineseName+"升级成功！耗费"+self.cost+"金币");
	//属性更改
	self.name = self.levelUpStyle;
	self.initPrototype();
	self.attack = self.attack*self.atcUpgrade >>> 0;
	self.cost = self.cost*self.costUpgrade >>> 0;
	self.range["range"] = self.range["range"]+self.rangeUpgrade;
	CGlobal.money -= self.cost;
	
	//更新范围
	self.updateRange();
};
CAttackChara.prototype.updateRange = function(){
	var self = this;
	
	self.showRangeLayer.graphics.clear();
	self.showRangeLayer.graphics.drawArc(0,"",[24,24,self.range["range"]*CGlobal.mapLength,0,2*Math.PI],true,"blue");
	
	self.realRangeLayer.graphics.clear();
	self.realRangeLayer.graphics.drawArc(0,"",[24,24,self.range["range"]*CGlobal.mapLength,0,2*Math.PI],true,"transparent");
};
CAttackChara.prototype.updateImg = function(){
	var self = this;
	
	if(self.levelUpStyle == null)return;
	var imgName = self.levelUpStyle;
	//更改人物形象列表
	if(self.attribute == "soldier"){
		self.bitmapDataList = {
			move:new LBitmapData(CGlobal.datalist[imgName+CGlobal.soldierStyle["our"]+"_move"],0,0,48,48),
			atc:new LBitmapData(CGlobal.datalist[imgName+CGlobal.soldierStyle["our"]+"_attack"],0,0,64,64)
		};
	}else{
		self.bitmapDataList = {
			move:new LBitmapData(CGlobal.datalist[imgName+"_move"],0,0,48,48),
			atc:new LBitmapData(CGlobal.datalist[imgName+"_attack"],0,0,64,64)
		};
	}
	//更改人物形象
	self.bitmap.bitmapData = self.bitmapDataList[self.mode];
	self.bitmap.bitmapData.setCoordinate(0,self.rowIndex*self.sy);
};
CAttackChara.prototype.withdraw = function(){
	var self = this;
	
	self.removeSelf();
	var recover = self.cost/5 >>> 0;
	CGlobal.money += recover;
	var hintObj = new CHintObject(self.ChineseName+"已被撤回，回收"+recover+"金币");
};
CAttackChara.prototype.removeSelf = function(){
	var self = this;
	CGlobal.mapObj.mapTerrain[self.y/CGlobal.mapLength>>>0][self.x/CGlobal.mapLength>>>0] = 0;
	self.parent.removeChild(self);
	self.die();
	for(var i=0;i<CGlobal.ourCharaList.debut.length;i++){
		if(self.objectIndex == CGlobal.ourCharaList.debut[i].objectIndex){
			CGlobal.ourCharaList.debut.splice(i,1);
			break;
		}
	}
};
CAttackChara.prototype.onclick = function(event,self){
	self.showRangeLayer.graphics.clear();
	var rangeObj;
	
	self.setLayer(self.parent.childList.length-1);
	if(self.isShowRange == false){
		self.showRangeLayer.graphics.drawArc(0,"",[24,24,self.range["range"]*CGlobal.mapLength,0,2*Math.PI],true,"blue");
		self.isShowRange = true;
		for(var key in self.parent.childList){
			var o = self.parent.childList[key];
			//让其他角色的攻击范围消失
			if(o.objectindex != self.objectindex){
				o.isShowRange = false;
				o.menuLayer.removeAllChild();
				o.showRangeLayer.graphics.clear();
				o.launchSkillLayer.removeAllChild();
			}
		}
		self.showMenu();
	}else{
		self.menuLayer.removeAllChild();
		self.launchSkillLayer.removeAllChild();
		self.isShowRange = false;
	}
};
CAttackChara.prototype.showMenu = function(){
	var self = this;
	//人物菜单按钮数据
	var menuButtonList = {
		"general":[
			{name:"信息",img:"info_icon"},
			{name:"移除",img:"delete_icon"}
		],
		"soldier":[
			{name:"升级",img:"levelup_icon"},
			{name:"信息",img:"info_icon"},
			{name:"移除",img:"delete_icon"}
		]
	};
	var menu = new CCharaOperatingMenu(menuButtonList[self.attribute],self.menuLayer);
	
	//显示技能发动按钮
	if(self.mp >= self.maxMp){
		var launchButton = new CLaunchSkill();
		launchButton.y = -84;
		self.launchSkillLayer.addChild(launchButton);
	}
};
CAttackChara.prototype.playSkill = function(){
	var self = this;
	
	self.isSkillPlay = true;
	self.isShowMpHint = true;
	self.effectLayer.removeAllChild();
	var skillObj = new CSkill(self.skill,self);
};
CAttackChara.prototype.initPrototype = function(){
	var self = this;
	self.data = {};
	for(var key in charaData[self.name]){
		self.data[key] = charaData[self.name][key];
	}
	self.attack = self.data.attack;
	self.ChineseName = self.data.name;
	self.introduction = self.data.introduction;
	self.arms = self.data.arms;
	self.attribute = self.data.attribute;
	self.isNormal = self.data.isNormal;
	self.normalStyle = self.data.normalStyle;
	self.mpGiven = self.data.mpGiven;
	
	self.cost = self.data.cost;
	self.range = {};
	for(var key in charaData[self.name]["range"]){
		self.range[key] = charaData[self.name]["range"][key];
	}
	self.mp = 0;
	self.skill = skillData[self.data.skill];
	self.mpUpgrade = self.data.mpUpgrade;
	//保存可攻击目标列表
	self.targetList = armsData[self.arms].target;
	//保存升级后的样式
	self.levelUpStyle = self.data.levelUpStyle;
	
	self.maxFrame = 1;
};
CAttackChara.prototype.onframe = function(){
	var self = this;
	
	if(self.frameIndex++ < self.maxFrame)return;
	self.frameIndex = 0;
	
	if(self.isFrameRun == true){
		var result = self.checkAtc();
		
		if(result == true){
			self.mode = "atc";
			self.isFrameRun = false;
			self.sy = 64;
			if(self.lastMode != self.mode){
				self.bitmap.x -= 8;
				self.bitmap.y -= 8;
			}
		}else{
			self.mode = "move";
			self.atcTarget = null;
			self.isFrameRun = true;
			self.sy = 48;
			if(self.lastMode != self.mode){
				self.bitmap.x += 8;
				self.bitmap.y += 8;
			}
		}
	}

	if(self.lastMode != self.mode){
		self.rowIndex = animationData[self.mode][self.dir][0];
		self.lastMode = self.mode;
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
	
	if(self.rowIndex++ >= animationData[self.mode][self.dir][1]){
		self.rowIndex = animationData[self.mode][self.dir][0];
		self.onComplete();
	}
};
CAttackChara.prototype.onComplete = function(){
	var self = this;
	
	self.isFrameRun = true;
	
	if(self.atcTarget != null){
		var cheakSingledResult = self.checkSingled(self,self.atcTarget);
		if(cheakSingledResult[0] == true){
			CGlobal.gotoSingled(cheakSingledResult[1]);
			self.atcTarget = null;
		}else{
			self.atcTarget.hp -= (self.attack >>> 0);
			if(self.isSkillPlay == false){
				if(self.attribute == "general"){
					self.mp += Math.ceil(self.mpUpgrade*self.atcTarget.mpGiven);
				}
			}
			if(self.atcTarget.hp > 0){
				self.atcTarget.showHp();
			}else{
				self.atcTarget.removeChild(self.atcTarget.hpLayer);
				
				self.atcTarget.removeSelf();
				self.atcTarget = null;
				self.kills ++;
				
				var isAddHint = false;
				for(var key in CGlobal.enemyHintLayer.childList){
					if(CGlobal.enemyHintLayer.childList[key].name == "CEnemyHint"){
						isAddHint = true;
						break;
					}
				}

				if((CGlobal.candidateEnemy.length == 0 && CGlobal.enemyCharaLayer.childList.length == 0)&& isAddHint == false){
					CGlobal.isAddEnemy = true;
					CGlobal.isNextWave = false;
				}
			}
		}
	}
	
	if(self.mp >= self.maxMp){
		self.mp = self.maxMp;
		
		if(self.isSkillPlay == false && self.isShowMpHint == false && self.skill != null){
			self.isShowMpHint = true;
			
			if(self.isShowRange == true){
				var launchButton = new CLaunchSkill();
				launchButton.y = -84;
				self.launchSkillLayer.addChild(launchButton);
			}
			
			var effectObj = new CEffect("怒气");
			effectObj.alpha = 0.6;
			self.effectLayer.addChild(effectObj);
			
			effectObj.addCompleteEvent(function(){
				effectObj.rowIndex = 0;
			});
		}
	}
};
CAttackChara.prototype.checkAtc = function(){
	var self = this;
	
	var rangeObj = self.realRangeLayer;
	
	var hitObj = null;
	if(CGlobal.enemyCharaLayer.childList.length == 0)return false;
	for(var key in CGlobal.enemyCharaLayer.childList){
		var o = CGlobal.enemyCharaLayer.childList[key];
		
		var oObj = new CShape();
		oObj.setArc(self.getRootCoordinate().x+24,self.getRootCoordinate().y+24,self.realRangeLayer.getWidth()/2);
		var eObj = new CShape();
		eObj.setRectangle(o.getRootCoordinate().x,o.getRootCoordinate().y,o.bitmap.getWidth(),o.bitmap.getHeight());
				
		if(CGlobal.hitTestRectArc(eObj,oObj,false)){
			hitObj = o;
		}else{
			hitObj = null;
		}
		if(hitObj != null){
			var r = CGlobal.hitTestRectArc(eObj,oObj);
			var fr = r;
			if(self.targetList.length == 0)fr = false;
			for(var key in self.targetList){
				if(self.targetList[key] == hitObj.arms || hitObj.canAtc == true){
					self.atcTarget = hitObj;
					self.changeDir();
				}else{
					fr = false;
				}
			}
			if(fr == true)return fr;
			continue;
		}else{
			continue;
		}
	}
	return false;
};
CAttackChara.prototype.changeDir = function(){
	var self = this;
	
	if(Math.floor(self.atcTarget.x/CGlobal.mapLength) == Math.floor(self.x/CGlobal.mapLength)){
		if(self.atcTarget.y > self.y){
			self.dir = "down";
		}else if(self.atcTarget.y < self.y){
			self.dir = "up";
		}
		return;
	}
	if(self.atcTarget.x >= self.x){
		self.dir = "right";
	}else if(self.atcTarget.x <= self.x){
		self.dir = "left";
	}else if(self.atcTarget.y >= self.y){
		self.dir = "down";
	}else if(self.atcTarget.y <= self.y){
		self.dir = "up";
	}
};
CAttackChara.prototype.isMaxLevel = function(level){
	var self = this;
	if(level <= self.maxLevel){
		return true;
	}
	var hintObj = new CHintObject(self.ChineseName + "等级已满");
	return false;
};
CAttackChara.prototype.setLayer = function(index){
	var self = this;
	
	var childList = new Array();
	
	if(self.parent.childList.length <= 1)return;
	
	self.parent.removeChild(self);
	for(var i=0; i<index; i++){
		childList.push(self.parent.childList[i]);
	}
	childList.push(self);
	for(var j=index; j<self.parent.childList.length; j++){
		childList.push(self.parent.childList[j]);
	}
	self.parent.childList = childList;
};
CAttackChara.prototype.checkSingled = function(so,ao){
	var self = this;
	var r = false,data = null;
	if(CGlobal.stage.singled == null || CGlobal.stage.singled == undefined)return [r,data];
	for(var key in CGlobal.stage.singled){
		var our = CGlobal.stage.singled[key].chara["our"];
		var enemy = CGlobal.stage.singled[key].chara["enemy"];
		if(our == so.name && enemy == ao.name){
			r = true;
			data = CGlobal.stage.singled[key];
			break;
		}
	}
	return [r,data];
};