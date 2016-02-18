function Point(width){
	var s = this;
	base(s,LSprite,[]);
	s.value = 0;
	s.parentWidth = width;
	s.numWidth = 20;
}
Point.prototype.setNumber = function(v){
	var s = this;
	s.value = v||s.value;
	var vl = s.value.toString().split('');
	LTweenLite.to(s,1,{
		alpha:0,
		onComplete:function(){
			s.removeAllChild();
			for(var i=0; i<vl.length; i++){
				var num = vl[i];
				var numBitmapData = new LBitmapData(datalist["num_"+num]);
				var numBitmap = new LBitmap(numBitmapData);
				numBitmap.x = s.numWidth*i;
				s.addChild(numBitmap);
			}
			s.x = (s.parentWidth-s.getWidth())*0.5;
			LTweenLite.to(s,1,{
				alpha:1
			});
		}
	});
};