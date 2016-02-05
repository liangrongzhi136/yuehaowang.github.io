function Food (foodBitmapData, x, y) {
	var s = this;
	LExtends(s, LSprite, []);

	s.x = x;
	s.y = y;

	s.bitmap = null;

	s.isBeEaten = false;

	s.floatTween = null;

	s.attachBitmap(foodBitmapData);
	s.addFoodShape();
	s.addTween();
}
Food.prototype.attachBitmap = function (bitmapData) {
	var s = this;

	s.bitmap = new LBitmap(bitmapData);
	s.addChild(s.bitmap);
};
Food.prototype.addFoodShape = function () {
	var s = this, r = s.getWidth() / 2;

	s.addShape(LShape.ARC, [r, r, r]);
};
Food.prototype.addTween = function () {
	var s = this, originalY = s.y;

	s.floatTween = LTweenLite.to(s, 0.2, {
		y : originalY + 10,
		loop : true
	}).to(s, 0.2, {
		y : originalY
	});
};
Food.prototype.destroy = function (beforeDestroy, onDestroy) {
	var s = this;

	beforeDestroy();

	s.isBeEaten = true;

	if (s.floatTween) {
		LTweenLite.remove(s.floatTween);
	}

	LTweenLite.to(s, 0.5, {
		y : s.y - 80,
		alpha : 0,
		onComplete : function (obj) {
			obj.remove();
			onDestroy();
		}
	});
};