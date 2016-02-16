function HpLayer () {
	var s = this;
	LExtends(s, LSprite, []);

	s.value = 5;

	for (var i = 0; i < s.value; i++) {
		var bmp = new LBitmap(new LBitmapData(dataList["heart_icon"]));
		bmp.x = i * 45;
		s.addChild(bmp);
	}
}

HpLayer.prototype.reduceHp = function () {
	var s = this;

	s.value -= 1;

	if (s.value >= 0) {
		var child = s.getChildAt(s.value);

		LTweenLite.to(child, 0.5, {
			y : child.y - 20,
			alpha : 0,
			onComplete : function (o) {
				o.remove();
			}
		});
	}
};
