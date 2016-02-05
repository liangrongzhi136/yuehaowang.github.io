function Txt (text, size, color, weight) {
	var s = this;
	LExtends(s, LTextField, []);

	s.text = text || "";
	s.size = size || "11";
	s.color = color || "black";
	s.weight = weight || "normal";
	s.font = Txt.FONT;
}
Txt.FONT = "Comic Sans MS";

(function (n) {
	var linux = "Linux", mac = "mac", win = "Windows";

	if (n.indexOf(linux, -1)) {
		Txt.FONT = "Droid Sans";
	} else if (n.indexOf(mac, -1)) {
		Txt.FONT = "Comic Sans";
	} else if (n.indexOf(win, 0))  {
		Txt.FONT = "Comic Sans MS";
	}
})(navigator.userAgent);

Txt.prototype._getWidth = function () {
	var s = this;

	if (s.wordWrap) {
		return s.width;
	}

	LGlobal.canvas.font = s.weight + " " + s.size + "pt " + s.font;
	return LGlobal.canvas.measureText(s.text).width;
};