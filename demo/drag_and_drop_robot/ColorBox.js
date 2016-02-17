function  ColorBox (color) {
	var s = this;
	LExtends(s, LSprite, []);

	s.color = color;

	s.graphics.drawArc(0, "", [0, 0, 25, 25, 0, Math.PI * 2], true, color);

	s.filters = [new LDropShadowFilter(null, null, color)];
}