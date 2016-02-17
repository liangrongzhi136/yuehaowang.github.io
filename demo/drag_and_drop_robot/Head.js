function Head (w, h) {
	var s = this;
	LExtends(s, Part, []);

	s.w = w;
	s.h = h;

	s.faceLayer = new LSprite();
	s.faceLayer.x = -w / 2;
	s.faceLayer.y = -h * 0.9;
	s.addChild(s.faceLayer);

	s.faceLayer.addShape(LShape.RECT, [0, 0, w, h]);

	s.draw();

	LTweenLite.to(s, 0.8, {
		rotate : -20,
		loop : true,
		ease : Sine.easeInOut
	}).to(s, 0.8, {
		rotate : 20,
		ease : Sine.easeInOut
	});
}

Head.prototype.draw = function () {
	var s = this, w = s.w, h = s.h;

	s.faceLayer.graphics.clear();

	s.faceLayer.graphics.drawRoundRect(1, "black", [0, 0, w, h, 10], true, s.fillColor);
	
	s.faceLayer.graphics.drawArc(1, "black", [12, 15, 6, 0, Math.PI * 2], true, "white");
	s.faceLayer.graphics.drawArc(1, "black", [11, 15, 2, 0, Math.PI * 2], true, "black");
	
	s.faceLayer.graphics.drawArc(1, "black", [w - 12, 15, 6, 0, Math.PI * 2], true, "white");
	s.faceLayer.graphics.drawArc(1, "black", [w - 11, 15, 1, 0, Math.PI * 2], true, "black");
	
	s.faceLayer.graphics.add(function () {
		var c = LGlobal.canvas;

		c.lineWidth = 3;
		c.strokeStyle = "black";
		c.lineCap = "round";
		c.moveTo(10, 30);
		c.quadraticCurveTo(20, 50, w - 10, 30);
		c.stroke();
	});
};