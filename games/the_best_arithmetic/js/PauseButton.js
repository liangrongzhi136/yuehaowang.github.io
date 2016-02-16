function PauseButton () {
	var s = this;
	LExtends(s, LSprite, []);

	s.runState = new LBitmap(new LBitmapData(dataList["flag_green_icon"]));
	s.addChild(s.runState);

	s.pauseState = new LBitmap(new LBitmapData(dataList["flag_red_icon"]));
	s.pauseState.visible = false;
	s.addChild(s.pauseState);

	s.addShape(LShape.RECT, [-20, -20, s.getWidth() + 40, s.getHeight() + 40]);
}

PauseButton.prototype.setPause = function (v) {
	var s = this;

	s.pauseState.visible = v;
	s.runState.visible = !v;
};