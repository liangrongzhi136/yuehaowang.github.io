function ClearButton (bgBitmapData, iconBitmapData) {
	var s = this;
	LExtends(s, LSprite, []);

	s.isRestore = false;
	s.restoreProgress = 0;
	s.restoreSpeed = 0.5;

	s.maxRestoreLoopIndex = 5;
	s.restoreLoopIndex = 0;

	s.back = null;
	s.icon = null;
	s.progressPie = null;

	s.addBack(bgBitmapData);
	s.addIcon(iconBitmapData);
	s.addProgressPie();
	s.addButtonShape();

	s.mouseEnabled = false;

	s.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
		e.currentTarget.clearPath();
	});
}
ClearButton.prototype.addBack = function (bgBitmapData) {
	var s = this;

	s.back = new LBitmap(bgBitmapData);
	s.addChild(s.back);
};
ClearButton.prototype.addIcon = function (iconBitmapData) {
	var s = this;

	s.icon = new LBitmap(iconBitmapData);
	s.icon.x = (s.getWidth() - s.icon.getWidth()) * 0.5;
	s.icon.y = (s.getHeight() - s.icon.getHeight()) * 0.5;
	s.addChild(s.icon);
};
ClearButton.prototype.addProgressPie = function () {
	var s = this;

	s.progressPie = new LShape();
	s.progressPie.x = s.getWidth() / 2;
	s.progressPie.y = s.getHeight() / 2;
	s.progressPie.rotate = -90;
	s.progressPie.alpha = 0.4;
	s.addChild(s.progressPie);
};
ClearButton.prototype.restore = function () {
	var s = this;

	if (!s.isRestore) {
		return;
	}

	if (s.restoreLoopIndex ++ < s.maxRestoreLoopIndex) {
		return;
	}
	s.restoreLoopIndex = 0;

	s.restoreProgress += s.restoreSpeed
	var p = (s.restoreProgress) / 100;

	s.progressPie.graphics.clear();
	s.progressPie.graphics.drawArc(0, "", [0, 0, s.getWidth() / 2, 0, Math.PI *  2 * (1 - p), false, true], true, "black");

	if (p >= 1) {
		s.isRestore = false;
		s.restoreProgress = 0;
	}
};
ClearButton.prototype.addButtonShape = function () {
	var s = this, r = s.getWidth() / 2;

	s.addShape(LShape.ARC, [r, r, r]);
};
ClearButton.prototype.clearPath = function () {
	var s = this;

	if (!s.parent || !s.parent.parent || s.isRestore) {
		return;
	}

	var pp = s.parent.parent;

	pp.bug.clearPath();

	s.progressPie.graphics.clear();
	s.progressPie.graphics.drawArc(0, "", [0, 0, s.getWidth() / 2, 0, Math.PI * 2, false, true], true, "black");

	s.isRestore = true;
};