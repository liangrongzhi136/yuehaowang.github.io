function Bird () {
	var self = this;
	LExtends(self, LSprite, []);

	/** Equilibrium position */
	self.y0 = 0;
	/** Speed of x-axis */
	self.v = 0;
	/** Amplitude */
	self.A = 0;
	/** Period */
	self.T = 0;
	/** Used time */
	self.t = 0;

	self.bmpW = 34;
	self.bmpH = 24;

	self.animaPlayDir = 1;
	self.animaIndex = 0;
	self.animaSpeed = 5;
	self.animaSpeedIndex = self.animaSpeed;

	self.bmp = new LBitmap(new LBitmapData(dataList["bird"], 0, 0, self.bmpW, self.bmpH));
	self.bmp.x = -self.bmpW / 2;
	self.bmp.y = -self.bmpH / 2;
	self.addChild(self.bmp);

	self.addShape(LShape.ARC, [0, 0, self.bmpW / 2]);

	self.getRandomOrbit();
}

Bird.prototype.getRandomOrbit = function () {
	var self = this,
		minY = 80,
		amplitude = 40 + Math.floor(Math.random() * 80),
		offsetY = Math.floor(Math.random() * 40);

	self.A = amplitude;
	self.T = 0.8 + Math.random() * 2;

	self.x = LGlobal.width;
	self.y = self.y0 = minY + amplitude + offsetY;
	self.v = -(2 + Math.random() * 2);
};

Bird.prototype.update = function () {
	var self = this, progress;

	self.t += LGlobal.speed / 1000;

	progress = (self.t / self.T) * Math.PI * 2;

	self.x += self.v;
	self.y = self.y0 + self.A * Math.sin(progress);
	self.rotate = -Math.atan(Math.cos(progress)) / Math.PI * 180;

	if (self.x + self.bmpW / 2 <= 0) {
		self.remove();
	}

	if (self.animaSpeedIndex++ >= self.animaSpeed) {
		self.animaSpeedIndex = 0;

		self.bmp.bitmapData.setCoordinate(self.animaIndex * self.bmpW, 0);

		self.animaIndex += self.animaPlayDir;

		if (
			self.animaIndex >= 2 && self.animaPlayDir > 0
			|| self.animaIndex <= 0 && self.animaPlayDir < 0
		) {
			self.animaPlayDir *= -1;
		}
	}
};

Bird.prototype.goDead = function () {
	var self = this, gameLayer = self.getParentByConstructor(GameLayer);

	if (!gameLayer) {
		return;
	}

	var explosion = new Explosion();
	explosion.x = self.x;
	explosion.y = self.y;
	gameLayer.effectLayer.addChild(explosion);

	gameLayer.addPoint(Math.ceil(-self.v / 2) + Math.round(3 - self.T));

	self.remove();
};