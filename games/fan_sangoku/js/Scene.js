function Scene(){
	base(this,LSprite,[]);
	this.lock = true;
}
Scene.prototype.display = function(completeFunc){
	var s = this;
	if(s.alpha == 1 && s.x == 0){
		s.lock = false;
		if(completeFunc)completeFunc(s);
		return;
	}
	LTweenLite.to(s,2,{
		x:0,
		alpha:1,
		onComplete:function(){
			s.lock = false;
			if(completeFunc)completeFunc(s);
		}
	});
};
Scene.prototype.hide = function(){
	var s = this;
	s.lock = true;
	LTweenLite.to(s,2,{
		x:LStage.width,
		alpha:0,
		onComplete:function(){
			s.remove();
		}
	});
};