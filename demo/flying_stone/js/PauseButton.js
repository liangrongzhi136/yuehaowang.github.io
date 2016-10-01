function PauseButton () {
	var self = this;
	LExtends(self, LSprite, []);

	self.pauseState = false;

	var bmpd = new LBitmapData(dataList["btn_pause_sheet"], 0, 64, 64, 64);
	self.texture = new LBitmap(bmpd);
	self.addChild(self.texture);
}

PauseButton.prototype.onDown = function (e) {
	var self = this;

	if (self.hitTestPoint(e.selfX, e.selfY)) {
		self.pauseState = !self.pauseState;

		if (self.pauseState) {
			self.texture.bitmapData.setCoordinate(0, 128);
		} else {
			self.texture.bitmapData.setCoordinate(0, 0);
		}

		return true;
	}

	return false;
};