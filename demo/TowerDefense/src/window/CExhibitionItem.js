function CExhibitionItem(charaName,itemWidth,itemHeight){
	var self = this;
	base(self,LSprite,[]);
	
	self.charaName = charaName;
	self.charaData = charaData[charaName];
	
	self.charaObj = new CCharacter(self.charaName);
	self.charaObj.skill = skillData[self.charaObj.data.skill]

	self._selfWidth = itemWidth;
	self._selfHeight = itemHeight;
	
	self._fWidth = 150;
	self._fHeight = 150;
	
	var back = new LSprite();
	back.alpha = 0.7;
	self.addChild(back);
	back.graphics.drawRect(0,"",[0,0,self._selfWidth,self._selfHeight],true,"#191818");
	
	self.backLayer = new LSprite();
	self.backLayer.x = 20;
	self.backLayer.y = 20;
	self.addChild(self.backLayer);
		
	self.faceLayer = new LSprite();
	self.backLayer.addChild(self.faceLayer);
			
	self.propertyLayer = new LSprite();
	self.propertyLayer.x = self._fWidth+20;
	self.backLayer.addChild(self.propertyLayer);
	
	self.introductionLayer = new LSprite();
	self.introductionLayer.y = self._fHeight+20;
	self.backLayer.addChild(self.introductionLayer);
	
	self.addFace();
	self.addProperty();
	
	var borderObj = new CPageBorder(self._selfWidth,self._selfHeight,false);
	self.addChild(borderObj);
}
CExhibitionItem.prototype.addFace = function(){
	var self = this;
	
	var face = new CFaceObject(self.charaObj,150,150);
	self.faceLayer.addChild(face);
};
CExhibitionItem.prototype.addProperty = function(){
	var self = this;
	var propertyColor = "white",propertySize = 15;
	var propertyList = {
		"攻击力":self.charaData.attack,
		"体力值":self.charaData.hp,
		"军饷":self.charaData.cost
	};
	var textObj;
	
	textObj = new LTextField();
	textObj.text = self.charaData.name;
	textObj.color = propertyColor;
	textObj.size = 25;
	self.propertyLayer.addChild(textObj);
	
	var i = 0;
	for(var key in propertyList){
		var layer = new LSprite();
		layer.y = i*30+50;
		self.propertyLayer.addChild(layer);
	
		textObj = new LTextField();
		textObj.text = key+"：";
		textObj.color = propertyColor;
		textObj.size = propertySize;
		layer.addChild(textObj);
		
		textObj = new LTextField();
		textObj.x = 80;
		textObj.text = propertyList[key];
		textObj.color = propertyColor;
		textObj.size = propertySize;
		layer.addChild(textObj);
		
		i++;
	}
	
	var skillLayer = new LSprite();
	skillLayer.x = 200;
	skillLayer.y = 0;
	self.propertyLayer.addChild(skillLayer);
	
	textObj = new LTextField();
	textObj.text = "技能：";
	textObj.color = propertyColor;
	textObj.size = propertySize;
	textObj.y = 0;
	skillLayer.addChild(textObj);

	if (self.charaObj.skill) {
		var skillIcon = new CSkillIcon(self.charaObj.skill.name);
		skillIcon.y = 30;
		skillLayer.addChild(skillIcon);
		
		textObj = new LTextField();
		textObj.text = self.charaData.introduction;
		textObj.color = propertyColor;
		textObj.size = propertySize;
		textObj.width = self._selfWidth-60;
		textObj.setWordWrap(true,25);
		self.introductionLayer.addChild(textObj);
	}
};