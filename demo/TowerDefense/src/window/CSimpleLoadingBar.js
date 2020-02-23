function CSimpleLoadingBar(){
	var s = this;
	base(s,LSprite,[]);
	
	s.progress = 0;
	s.borderWidth = 3;
	s.barWidth = 450;
	s.barHeight = 10;
	
	var backLayer = new LSprite();
	backLayer.graphics.drawRect(0,"",[0,0,LStage.width,LStage.height],true,"#222222");
	s.addChild(backLayer);
	
	s.bar = new LSprite();
	s.bar.graphics.drawRect(s.borderWidth,"black",[0,0,s.barWidth,s.barHeight],true,"black");
	s.bar.x = (LStage.width-s.bar.getWidth())*0.5;
	s.bar.y = (LStage.height-s.bar.getHeight())*0.5;
	s.addChild(s.bar);
	
	s.text = new LTextField();
	s.text.text = "0%";
	s.text.size = 15;
	s.text.color = "white";
	s.text.x = (LStage.width-s.text.getWidth())*0.5;
	s.text.y = s.bar.y-s.text.getHeight()-20;
	s.text.font = "Georgia";
	s.text.weight = "italic";
	s.addChild(s.text);
}
CSimpleLoadingBar.prototype.setProgress = function(v){
	var s = this;
	if(v > 100)v=100;
	var p = v/100;
	s.bar.graphics.drawRect(0,"",[s.borderWidth/2,s.borderWidth/2,(s.barWidth-s.borderWidth)*p,s.barHeight-s.borderWidth],true,"gray");
	s.text.text = v+"%";
	s.text.x = (LStage.width-s.text.getWidth())*0.5;
};