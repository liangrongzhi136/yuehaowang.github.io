function CLoadingBar(){
	var self = this;
	base(self,LSprite,[]);
	
	self.barWidth = 400;
	self.barHeight = 50;
	
	var imageList = [
		"loading_back01",
		"loading_back02",
		"loading_back03",
		"loading_back04",
		"loading_back05"
	];
	
	var currentImage = imageList[Math.floor(Math.random()*(imageList.length))];
	
	//加入背景层
	self.backLayer = new LSprite();
	self.addChild(self.backLayer);
	
	self.backBorder = new CPageBorder(LGlobal.width,LGlobal.height,true);
	self.backLayer.addChild(self.backBorder);
	
	self.backImage = new LBitmap(new LBitmapData(CGlobal.datalist[currentImage]));
	self.backLayer.addChild(self.backImage);
	self.backImage.scaleX = LStage.width/self.backImage.getWidth();
	self.backImage.scaleY = LStage.height/self.backImage.getHeight();
	
	//加入进度条层
	self.contentLayer = new LSprite();
	self.contentLayer.x = (LGlobal.width-self.barWidth)*0.5;
	self.contentLayer.y = (LGlobal.height-self.barHeight)*0.5;
	self.addChild(self.contentLayer);
	
	self.progressLayer = new LSprite();
	self.contentLayer.addChild(self.progressLayer);
	self.progressLayer.x = 0;
	self.progressLayer.y = 0;
	self.progressLayer.alpha = 0.8;
	
	self.progressBorder = new CPageBorder(self.barWidth,self.barHeight,false);
	self.contentLayer.addChild(self.progressBorder);
	
	self.progress = 0;
	
	if(CGlobal.isMusicPlay == true){
		//将所有音乐设置为禁音
		CMusicManager.setMusicMute();
	}
}
CLoadingBar.prototype.setProgress = function(v){
	var self = this;
	if(v >= 100){
		v = 100;
		if(CGlobal.isMusicPlay == true){
			//将所有音乐设置为非禁音
			CMusicManager.setMusicValid();
		}
	}
	self.progress = v;
	var showValue = v/100 * self.barWidth;
	self.progressLayer.graphics.clear();
	self.progressLayer.graphics.drawRect(0,"",[0,0,showValue,self.barHeight],true,"#333333");
};