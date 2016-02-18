var Scale3D = function(){throw "Scale3D cannot be instantiated";};
Scale3D.type = "Scale3D";
Scale3D.tweenObj = null;
Scale3D.to = function(o,time,trans){
	var object = o;
	var ow,oh,ox=object.x,oy=object.y;
	var loop = trans["loop"]||false;
	var _f = function(){
		ow=object.getWidth(),oh=object.getHeight();
		var trans1 = {
			scaleX: trans["scaleX"]||object.scaleX,
			scaleY: trans["scaleY"]||object.scaleY,
			rotate: trans["rotate"]*0.5||object.rotate,
			alpha: trans["alpha"]*0.5||object.alpha,
			delay: trans["delay"]||0,
			ease: trans["ease"]|null,
			onStart:function(){
				if(trans["onStart"])trans["onStart"]();
			},
			onUpdate:function(object){
				object.x = ox+(ow-object.getWidth())*0.5;
				object.y = oy+(oh-object.getHeight())*0.5;
				if(trans["onUpdate"])trans["onUpdate"]();
			},
			onComplete:function(){
				object.x = ox+(ow-object.getWidth())*0.5;
				object.y = oy+(oh-object.getHeight())*0.5;
				if(trans["onChanged"])trans["onChanged"]();
				if(trans["isBack"] != false){
					Scale3D.tweenObj = LTweenLite.to(object,time/2,trans2);
				}else{
					if(trans["onComplete"])trans["onComplete"]();
				}
			}
		}
		var trans2 = {
			scaleX: trans["scaleX"]*-1||object.scaleX,
			scaleY: trans["scaleY"]*-1||object.scaleY,
			rotate: trans["rotate"]||object.rotate,
			alpha: trans["alpha"]||object.alpha,
			delay: trans["stay"]||0,
			ease: trans["ease"]||null,
			onStart:function(){
				if(trans["stayComplete"])trans["stayComplete"]();
			},
			onUpdate:function(object){
				object.x = ox+(ow-object.getWidth())*0.5;
				object.y = oy+(oh-object.getHeight())*0.5;
				if(trans["onUpdate"])trans["onUpdate"]();
			},
			onComplete:function(){
				if(loop)_f();
				object.x = ox+(ow-object.getWidth())*0.5;
				object.y = oy+(oh-object.getHeight())*0.5;
				if(trans["onChanged"])trans["onChanged"]();
				if(trans["onComplete"])trans["onComplete"]();
			}
		}
		var rtime = trans["isBack"]!=false?time/2:time;
		Scale3D.tweenObj = LTweenLite.to(object,rtime,trans1);
	};
	_f();
};