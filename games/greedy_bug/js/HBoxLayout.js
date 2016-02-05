function HBoxLayout (list, margin, height, align) {
	var s = this;

	s.list = list || new Array();
	s.margin = (typeof margin == "number") ? margin : 0;
	s.height = height;
	s.align = align;
}
HBoxLayout.prototype.synchronous = function () {
	var s = this, list = s.list, margin = s.margin, height = s.height, align = s.align, preObj;

	for (var k = 0, l = list.length; k < l; k++) {
		var o = list[k];

		if (height) {
			switch (align) {
				case "middle" :
					o.y = (height - o.getHeight()) / 2;
					break;
				case "top" :
					o.y = 0;
					break;
				case "bottom" :
					o.y = height - o.getHeight();
					break;
			}
		}

		if (!preObj) {
			preObj = o;
			continue;
		}
		
		o.x = preObj.x + preObj.getWidth() + margin;

		preObj = o;
	}
};