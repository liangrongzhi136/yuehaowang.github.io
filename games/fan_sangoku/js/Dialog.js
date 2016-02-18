function Dialog(content){
	var s = this;
	base(s,LSprite,[]);
	
	s.lock = true;
	s.content = content;
	s.onBtnClick = null;
	
	var bgBitmap = new LBitmap(new LBitmapData(datalist["dlg_back"]));
	s.addChild(bgBitmap);
	var buttonLayer = new LSprite();
	s.addChild(buttonLayer);
	var contentLayer = new LSprite();
	s.addChild(contentLayer);
	
	var buttonNormalStyle = new LBitmap(new LBitmapData(datalist["common_widget"],0,192,210,71));
	buttonNormalStyle.scaleX = buttonNormalStyle.scaleY = 0.8;
	var buttonOverStyle = new LBitmap(new LBitmapData(datalist["common_widget"],398,192,210,71));
	buttonOverStyle.scaleX = buttonOverStyle.scaleY = 0.8;
	
	s.okBtn = new LButton(buttonNormalStyle.clone(),buttonOverStyle.clone());
	s.okBtn.x = 0;
	s.okBtn.y = bgBitmap.getHeight()-s.okBtn.getHeight()-50;
	buttonLayer.addChild(s.okBtn);
	var okBtnText = new LBitmap(new LBitmapData(datalist["word_widget"],440,250,95,40));
	okBtnText.scaleX = okBtnText.scaleY = 1;
	okBtnText.x = (s.okBtn.getWidth()-okBtnText.getWidth())*0.5;
	okBtnText.y = (s.okBtn.getHeight()-okBtnText.getHeight())*0.5;
	s.okBtn.addChild(okBtnText);
	s.okBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){
		if(s.lock)return;
		s.hide();
		if(s.onBtnClick)s.onBtnClick();
	});
	
	buttonLayer.x = (s.getWidth()-buttonLayer.getWidth())*0.5;
	buttonLayer.y = (s.getHeight()-buttonLayer.getHeight())*0.5;
	
	contentLayer.x = 30;
	contentLayer.y = 30;
	var textObj = new LTextField();
	textObj.width = s.getWidth()-contentLayer.x*2;
	textObj.color = "white";
	textObj.weight = "bold";
	textObj.size = 15;
	textObj.font = "微软雅黑";
	textObj.text = s.content;
	textObj.setWordWrap(true,30);
	contentLayer.addChild(textObj);
	
	s.scaleX = 0;
	s.scaleY = 0;
	s.alpha = 0;
	LTweenLite.to(s,1,{
		scaleX:1,
		scaleY:1,
		alpha:1,
		onUpdate:function(){
			s.x = (LStage.width-s.getWidth())*0.5;
			s.y = (LStage.height-s.getHeight())*0.5;
		},
		onComplete:function(){
			s.lock = false;
			s.x = (LStage.width-s.getWidth())*0.5;
			s.y = (LStage.height-s.getHeight())*0.5;
		}
	});
}
Dialog.prototype.hide = function(){
	var s = this;
	
	LTweenLite.to(s,1,{
		scaleX:0,
		scaleY:0,
		alpha:0,
		onUpdate:function(){
			s.x = (LStage.width-s.getWidth())*0.5;
			s.y = (LStage.height-s.getHeight())*0.5;
		},
		onComplete:function(){
			s.lock = false;
		}
	});
};