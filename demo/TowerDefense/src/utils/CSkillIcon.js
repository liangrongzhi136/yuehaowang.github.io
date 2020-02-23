function CSkillIcon(name){
	var self = this;
	base(self,LSprite,[]);
	
	self.name = name;
	self.skillData = null;
	
	for(var key in skillData){
		if(skillData[key].name == self.name){
			self.skillData = skillData[key];
			break;
		}
	}
	
	var bitmapData = new LBitmapData(CGlobal.datalist["skills"],self.skillData.col*56,self.skillData.row*56,56,56);
	self.bitmap = new LBitmap(bitmapData);
	self.addChild(self.bitmap);
	
	self.infoLayer = new LSprite();
	self.infoLayer.x = self.bitmap.getWidth()+5;
	self.infoLayer.y = 0;
	self.addChild(self.infoLayer);
	
	self.addEventListener(LMouseEvent.MOUSE_DOWN,self.onDown);
	self.addEventListener(LMouseEvent.MOUSE_UP,self.onUp);
}
CSkillIcon.prototype.onDown = function(event,self){
	var infoWidth = 160;
	var infoHeight = 0;
	var textColor = "white";
	
	var backLayer = new LSprite();
	backLayer.alpha = 0.7;
	self.infoLayer.addChild(backLayer);
	
	var nameTextObj = new LTextField();
	nameTextObj.x = 10;
	nameTextObj.y = 10;
	nameTextObj.size = 20;
	nameTextObj.text = self.name;
	nameTextObj.color = textColor;
	self.infoLayer.addChild(nameTextObj);

	var effectTextObj = new LTextField();
	effectTextObj.x = 10;
	effectTextObj.y = parseInt(nameTextObj.y) + parseInt(nameTextObj.getHeight()) + 20;
	effectTextObj.text = self.skillData.introduction;
	effectTextObj.color = textColor;
	
	var effectTextRow = Math.ceil(effectTextObj.getWidth()/(infoWidth-20));
	var wordHeight = 20;
	
	effectTextObj.width = infoWidth - 30;
	effectTextObj.setWordWrap(true,wordHeight);
	self.infoLayer.addChild(effectTextObj);
	
	infoHeight = parseInt(effectTextRow*wordHeight)+parseInt(effectTextObj.y)+10;
	backLayer.graphics.drawRect(0,"",[0,0,infoWidth,infoHeight],true,"black");
};
CSkillIcon.prototype.onUp = function(event,self){
	self.infoLayer.graphics.clear();
	self.infoLayer.removeAllChild();
};