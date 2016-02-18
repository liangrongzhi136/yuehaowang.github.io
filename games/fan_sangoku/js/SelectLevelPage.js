function SelectLevelPage(){
	var s = this;
	base(s,Scene,[]);
	
	var bitmap = new LBitmap(new LBitmapData(datalist["selectlevel_back"]));
	bitmap.scaleX = LStage.width/bitmap.getWidth();
	bitmap.scaleY = LStage.height/bitmap.getHeight();
	s.addChild(bitmap);
	var levelLayer = new LSprite();
	levelLayer.y = 70;
	s.addChild(levelLayer);
	
	var levelData = [
		{index:1,imgdata:[68,60]},
		{index:2,imgdata:[40,0]},
		{index:3,imgdata:[76,0]},
		{index:4,imgdata:[114,0]},
		{index:5,imgdata:[152,0]}
	];
	var index = 0;
	for(var key in levelData){
		var data = levelData[key];
		var levelObj = new LSprite();
		levelObj.levelIndex = data["index"];
		if(key >= 2){
			index = key-2;
			levelObj.x = (LStage.width-540)*0.5+index*180;
			levelObj.y = 150;
		}else{
			levelObj.x = (LStage.width-360)*0.5+index*180;
		}
		levelLayer.addChild(levelObj);
		
		var normalBackBitmap = new LBitmap(new LBitmapData(datalist["common_widget"],415,360,150,150));
		normalBackBitmap.x = -2;
		normalBackBitmap.y = 3;
		var overBackBitmap = new LBitmap(new LBitmapData(datalist["common_widget"],270,360,150,150));
		var levelButton = new LButton(normalBackBitmap,overBackBitmap);
		levelObj.addChild(levelButton);
		
		if(s.canPlayThisLevel(levelObj) == true){
			levelButton.addEventListener(LMouseEvent.MOUSE_UP,function(event){
				if(s.lock)return;
				s.hide();
				startGame(event.clickTarget.parent.levelIndex);
			});
			var numBitmapData = new LBitmapData(datalist["number_chs"],data["imgdata"][0],data["imgdata"][1],35,30);
		}else{
			var numBitmapData = new LBitmapData(datalist["lock"]);
		}
		var numBitmap = new LBitmap(numBitmapData);
		numBitmap.x = (overBackBitmap.getWidth()-numBitmap.getWidth())*0.5;
		numBitmap.y = (overBackBitmap.getHeight()-numBitmap.getHeight())*0.5;
		levelObj.addChild(numBitmap);
		
		index++;
	}
	
	s.x = -LStage.width;
	s.alpha = 0;
	
	s.display();
}
SelectLevelPage.prototype.canPlayThisLevel = function(o){
	for(var i=0; i<unlockLevel.length; i++){
		if("level"+o.levelIndex == unlockLevel[i]){
			return true;
		}
	}
	return false;
};