function Limb (l, r, rotate1, rotate2, rotate3, rotate4) {
	var s = this;
	LExtends(s, Part, []);

	s.l = l;
	s.r = r;

	s.part1 = new LSprite();
	s.addChild(s.part1);

	s.part2 = new LSprite();
	s.part2.y = l - r;
	s.part1.addChild(s.part2);

	s.draw();

	s.part1.addShape(LShape.RECT, [-r, -r, r * 2, l]);
	s.part2.addShape(LShape.RECT, [-r, -r * 1.5, r * 2, l]);

	LTweenLite.to(s.part1, 1, {
		rotate : rotate1,
		loop : true
	}).to(s.part1, 0.8, {
		rotate : rotate2
	});

	LTweenLite.to(s.part2, 1, {
		rotate : rotate3,
		loop : true
	}).to(s.part2, 0.8, {
		rotate : rotate4
	});
}

Limb.prototype.draw = function () {
	var s = this,
	l = s.l,
	r = s.r,
	w = r * 2,
	c = s.fillColor;

	s.part1.graphics.clear();
	s.part2.graphics.clear();

	s.part1.graphics.drawRoundRect(1, "black", [-r, -r, w, l, r], true, c);
	s.part1.graphics.drawArc(1, "black", [0, 0, r * 1.4, 0, Math.PI * 2], true, c);

	s.part2.graphics.drawRoundRect(1, "black", [-r, -r * 1.5, w, l, r], true, c);
	s.part2.graphics.drawArc(1, "black", [0, 0, r * 1.4, 0, Math.PI * 2], true, c);
};