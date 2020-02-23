function CSkill(data,lauchSkillChara){
	var self = this;
	base(self,LSprite,[]);
	
	self.data = data;
	self.chara = lauchSkillChara;
	
	self.skillComplete = false;
	
	self.frameIndex = 0;
	self.maxFrame = 100;
	
	//更改发动技能的角色的属性
	for(var key in self.data.effect){
		if(key == "speed"){
			self.chara.maxFrame -= self.data.effect[key];
		}
		if(key == "attack"){
			self.chara.attack = self.chara.attack*self.data.effect[key];
		}
	}
	//加入提示信息
	var hintObj = new CHintObject(self.chara.ChineseName+"发动技能"+self.data.name);
	
	self.chara.addEventListener(LEvent.ENTER_FRAME,function(){
		if(self.skillComplete == true)return;
		if(self.chara.isSkillPlay == true && self.frameIndex ++ >= self.maxFrame){
			self.frameIndex = 0;
			self.chara.initPrototype();
			self.chara.isSkillPlay = false;
			self.chara.isShowMpHint = false;
			self.skillComplete = true;
		}
	});
}