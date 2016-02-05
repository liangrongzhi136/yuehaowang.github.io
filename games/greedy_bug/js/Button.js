function Button (back, label, filterColor) {
	var s = this;
	LExtends(s, LSprite, []);

	s.filterColor = filterColor || "white";

	s.back = back;
	s.addChild(s.back);

	if (label) {
		s.label = label;
		s.label.x = (s.getWidth() - s.label.getWidth()) / 2;
		s.label.y = (s.getHeight() - s.label.getHeight()) / 2;
		s.addChild(s.label);
	}

	Button.BUTTON_LIST.push(s);

	s.addEventListener(LMouseEvent.MOUSE_MOVE, s.mouseMove);
	s.addEventListener(LMouseEvent.MOUSE_OUT, s.mouseOut);
}
Button.BUTTON_LIST = new Array();
Button.prototype.mouseMove = function (e) {
	var s = e.currentTarget;

	if (!s.label) {
		return;
	}

	if (!s.label.filters) {
		var shadow = new LDropShadowFilter();
		shadow.setColor(s.filterColor);
		s.label.filters = [shadow];

		for (var k = 0, l = Button.BUTTON_LIST.length; k < l; k++) {
			var o = Button.BUTTON_LIST[k];
			if (o.objectIndex != s.objectIndex) {
				o.mouseOut({currentTarget : o});
			}
		}
	}
};
Button.prototype.mouseOut = function (e) {
	var s = e.currentTarget;

	if (!s.label) {
		return;
	}

	s.label.filters = null;
};
Button.prototype.setFilterColor = function (color) {
	this.filterColor = color || "white";
};
Button.prototype.setLabel = function (txt) {
	var s = this;

	if (s.label && s.label.parent) {
		s.label.remove();
	}
	s.label = txt;
	s.label.x = (s.getWidth() - s.label.getWidth()) / 2;
	s.label.y = (s.getHeight() - s.label.getHeight()) / 2;
	s.addChild(s.label);
};
Button.prototype.die = function () {
	var s = this;
	
	for (var k = 0; k < Button.BUTTON_LIST.length; k++) {
		var o = Button.BUTTON_LIST[k];
		if (o.objectIndex == s.objectIndex) {
			Button.BUTTON_LIST.splice(k, 1);
			break;
		}
	}
	s.callParent("die", arguments);
};