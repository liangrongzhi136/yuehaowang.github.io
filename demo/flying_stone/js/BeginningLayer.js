function BeginningLayer () {
	var self = this;
	LExtends(self, LSprite, []);

	self.v = -1;
	self.A = 50;

	self.bg = new LBitmap(new LBitmapData(dataList["bg"]));
	self.bg.y = self.bg.y0 = -self.A;
	self.addChild(self.bg);

	var logoBmp = new LBitmap(new LBitmapData(dataList["logo"]));
	logoBmp.x = (LGlobal.width - logoBmp.getWidth()) / 2;
	logoBmp.y = 80;
	self.addChild(logoBmp);

	self.createStartBtn();

	self.addEventListener(LEvent.ENTER_FRAME, self.update);
}

BeginningLayer.prototype.createStartBtn = function () {
	var self = this, r = 80;

	var startBtn = new RoundButton("Go", r, 70);
	startBtn.x = (LGlobal.width - r * 2) / 2;
	startBtn.y = 430;
	self.addChild(startBtn);

	startBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		self.destroy();
	});
};

BeginningLayer.prototype.update = function (e) {
	var self = e.currentTarget;

	self.bg.x += self.v;
	self.bg.y = self.bg.y0 + self.A * Math.sin(self.bg.x / 50);

	if (self.bg.x >= 0 || self.bg.x <= LGlobal.width - self.bg.getWidth()) {
		self.v *= -1;
	}
};

BeginningLayer.prototype.destroy = function () {
	var self = this;

	delete self.bg;

	self.remove();

	startGame();
};