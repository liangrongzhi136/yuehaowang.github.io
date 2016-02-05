function VBoxLayout (list, margin, width, align) {
	var s = this;

	s.list = list || new Array();
	s.margin = (typeof margin == "number") ? margin : 0;
	s.width = width;
	s.align = align;
}
VBoxLayout.prototype.synchronous = function () {
	var s = this, list = s.list, margin = s.margin, width = s.width, align = s.align, preObj;

	for (var k = 0, l = list.length; k < l; k++) {
		var o = list[k];

		if (width) {
			switch (align) {
				case "center" :
					o.x = (width - o.getWidth()) / 2;
					break;
				case "left" :
					o.x = 0;
					break;
				case "right" :
					o.x = width - o.getWidth();
					break;
			}
		}

		if (!preObj) {
			preObj = o;
			continue;
		}

		o.y = preObj.y + preObj.getHeight() + margin;

		preObj = o;
	}
};