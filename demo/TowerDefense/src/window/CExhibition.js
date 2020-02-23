function CExhibition(){
	var self = this;
	base(self,LSprite,[]);
	
	self.dataList = {};
	for(var key in charaData){
		if(charaData[key].attribute == "general" && charaData[key].isNormal == false){
			self.dataList[key] = charaData[key];
		}
	}
	
	self.generalIndex = 0;
	self.isButtonCtrl = true;
	
	self.itemWidth = 660;
	self.itemHeight = 340;
	
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
		
	self.bitmap = new LBitmap(new LBitmapData(CGlobal.datalist["exhibition_back"]));
	self.bitmap.scaleX = LStage.width/self.bitmap.getWidth();
	self.bitmap.scaleY = LStage.height/self.bitmap.getHeight();
	self.backLayer.addChild(self.bitmap);
	
	self.itemLayer = new LSprite();
	self.itemLayer.x = (LStage.width-self.itemWidth)*0.5;
	self.itemLayer.y = (LStage.height-self.itemHeight)*0.5;
	self.backLayer.addChild(self.itemLayer);
	
	self.itemBeginX = self.itemLayer.x;
	self.itemBeginY = self.itemLayer.y;
	
	self.addCharaInfo();
	self.addChangeCharaArrow();
	
	//加入边框
	var pageBorder = new CPageBorder(LStage.width,LStage.height,true);
	self.addChild(pageBorder);

	self.addCloseButton();
}
CExhibition.prototype.addCharaInfo = function(){
	var self = this;
	var index = 0;
	for(var key in self.dataList){
		var obj = new CExhibitionItem(key,self.itemWidth,self.itemHeight);
		self.itemLayer.addChild(obj);
		obj.x = index*self.itemWidth;
		obj.alpha = 0;
		index++;
	}
	self.showGeneral();
};
CExhibition.prototype.addCloseButton = function(){
	var self = this;
	//加入关闭按钮
	self.closeButton = new CCloseButton(function(){
		CGlobal.stageLayer.removeChild(self);
		self.die();
		//加入选关界面
		CGlobal.addSelectLevelPage();
	});
	self.closeButton.x = LGlobal.width-self.closeButton.button.getWidth()-10;
	self.closeButton.y = 5;
	self.addChild(self.closeButton);
};
CExhibition.prototype.addChangeCharaArrow = function(){
	var self = this;
	
	var button,bitmap;
	button = new LSprite();
	bitmap = new LBitmap(new LBitmapData(CGlobal.datalist["arrow_left"]));
	button.addChild(bitmap);
	button.x = self.itemLayer.x-button.getWidth()-10;
	button.y = (LStage.height-button.getHeight())*0.5;
	self.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(!self.isButtonCtrl)return;
		self.previousGeneral(self);
	});
	
	button = new LSprite();
	bitmap = new LBitmap(new LBitmapData(CGlobal.datalist["arrow_right"]));
	button.addChild(bitmap);
	button.x = self.itemLayer.x+self.itemWidth+10;
	button.y = (LStage.height-button.getHeight())*0.5;
	self.addChild(button);
	button.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(!self.isButtonCtrl)return;
		self.nextGeneral(self);
	});
};
CExhibition.prototype.previousGeneral = function(self){
	var maxLength = self.itemLayer.childList.length;
	self.generalIndex --;
	if(self.generalIndex < 0){
		self.generalIndex = maxLength-1;
	}
	self.showGeneral();
};
CExhibition.prototype.nextGeneral = function(self){
	var maxLength = self.itemLayer.childList.length;
	self.generalIndex ++;
	if(self.generalIndex > maxLength-1){
		self.generalIndex = 0;
	}
	self.showGeneral();
};
CExhibition.prototype.showGeneral = function(){
	var self = this;
	var ic = self.itemLayer.childList;
	var obj = ic[self.generalIndex];
	for(var key in ic){
		ic[key].alpha = 0;
	}
	self.itemLayer.x -= obj.x+obj.parent.x-self.itemBeginX;
	LTweenLite.to(obj,1,{
		alpha: 1,
		onUpdate:function(){
			self.isButtonCtrl = false;
		},
		onComplete:function(){
			self.isButtonCtrl = true;
		}
	});
};