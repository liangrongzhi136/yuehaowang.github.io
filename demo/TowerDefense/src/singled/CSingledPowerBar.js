function CSingledPowerBar(){
	var s = this;
	base(s,LSprite,[]);
	
	s.powerBarWidth = 400;
	s.powerBarHeight = 20;
	s.progress = 0;
	
	var edge = s.powerBarHeight/2;
	
	s.visible = false;
	
	s.borderLayer = new LSprite();
	s.borderLayer.x = -edge;
	s.borderLayer.y = edge;
	s.borderLayer.graphics.drawVertices(5,"dimgray",[[edge,-edge],[edge+s.powerBarWidth,-edge],[s.powerBarWidth+edge*2,0],[s.powerBarWidth+edge,edge],[edge,edge],[0,0]]);
	
	s.powerBarWidth = s.powerBarWidth+edge*2;
	
	s.backLayer = new LSprite();
	s.backLayer.x = -edge;
	s.backLayer.mask = s.borderLayer;
	s.backLayer.graphics.drawRect(0,"",[0,0,s.powerBarWidth+edge*2,s.powerBarHeight],true,"#ed1c24");
	s.addChild(s.backLayer);
	
	s.progressLayer = new LSprite();
	s.progressLayer.x = -edge;
	s.progressLayer.mask = s.borderLayer;
	s.addChild(s.progressLayer);
	
	s.starLayer = new LSprite();
	s.addChild(s.starLayer);
}
CSingledPowerBar.prototype.start = function(){
	var s = this;
	
	s.visible = true;
	s.progress = 50;
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
};
CSingledPowerBar.prototype.add = function(p){
	var s = this;
	s.progress += p;
	if(s.progress >= 100){
		s.removeEventListener(LEvent.ENTER_FRAME,s.onframe);
		s.visible = false;
		s.progress = 0;
		s.parent.parent.parent.fightWin();
	}
};
CSingledPowerBar.prototype.reduction = function(p){
	var s = this;
	s.progress -= p;
	if(s.progress <= 0){
		s.removeEventListener(LEvent.ENTER_FRAME,s.onframe);
		s.visible = false;
		s.progress = 0;
		s.parent.parent.parent.fightLose();
	}
};
CSingledPowerBar.prototype.onframe = function(s){
	var showDistance = s.progress*0.01*s.powerBarWidth;
	s.progressLayer.graphics.clear();
	s.progressLayer.graphics.drawRect(0,"",[0,0,showDistance,s.powerBarHeight],true,"#009f00");
	
	for(var i=0,l=s.starLayer.childList.length;i<l;i++){
		star = s.starLayer.childList[i];
		star.alpha -= 0.1;
		star.x += star.speedx;
		star.y += star.speedy;
		if(star.alpha <= 0){
			s.starLayer.removeChild(star);
			i--,l--;
		}
	}
	if(s.starLayer.childList.length < 8)s.addStar();
};
CSingledPowerBar.prototype.addStar = function(){
	var s = this,c = LGlobal.canvas;

	var showDistance = s.progress*0.01*s.powerBarWidth;
	
	var star = new LSprite();
	star.x = showDistance-15;
	s.starLayer.addChild(star);
	
	var step = 5 + Math.floor(Math.random()*4);

	star.graphics.drawVertices(0,"",[[step*2,step],[step*4,0],[step*3,step*2],[step*4,step*4],[step*2,step*3],[0,step*4],[step,step*2],[0,0]],true,"yellow");
	star.speedx = 4 - 8*Math.random();
	star.speedy = 4 - 8*Math.random();
};