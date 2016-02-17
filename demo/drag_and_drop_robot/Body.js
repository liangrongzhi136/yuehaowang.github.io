function Body (w, h, r) {
	var s = this;
	LExtends(s, Part, []);

	s.w = w;
	s.h = h;
	s.r = r;

	s.bodyLayer = new LSprite();
	s.addChild(s.bodyLayer);

	s.bodyLayer.addShape(LShape.RECT, [0, 0, w, h]);

	s.draw();
	
	LTweenLite.to(s, 1, {
		rotate : 5,
		loop : true,
		ease : Cubic.easeInOut
	}).to(s, 1, {
		rotate : -10,
		ease : Cubic.easeInOut
	});
}

Body.prototype.draw = function () {
	var s = this,
	w = s.w,
	h = s.h,
	r = s.r,
	c = s.fillColor,
	lx = r - 3,
	rx = w - r + 3,
	uy = r - 3,
	dy = h - r + 3,
	pi = Math.PI * 2;

	s.bodyLayer.graphics.clear();

	s.bodyLayer.graphics.drawRoundRect(1, "black", [0, 0, w, h, 10], true, c);

	s.bodyLayer.graphics.drawArc(1, "black", [lx, uy, r, 0, pi], true, c);
	s.bodyLayer.graphics.drawArc(1, "black", [rx, uy, r, 0, pi], true, c);

	s.bodyLayer.graphics.drawArc(1, "black", [lx, dy, r, 0, pi], true, c);
	s.bodyLayer.graphics.drawArc(1, "black", [rx, dy, r, 0, pi], true, c);
};