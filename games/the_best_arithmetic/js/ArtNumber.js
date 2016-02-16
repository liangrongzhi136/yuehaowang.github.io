function ArtNumber (number, color) {
	var s = this;
	LExtends(s, LSprite, []);

	s.value = number;

	if (!color) {
		color = "white";
	}

	var ns = number.toString();
	
	var contentTxt = new LTextField();
	contentTxt.x = 25;
	contentTxt.y = 18;
	contentTxt.size = 30;
	contentTxt.color = color;
	contentTxt.text = ns;
	contentTxt.weight = "bold";
	s.addChild(contentTxt);
	
	s.graphics.drawRoundRect(0, "", [0, 0, contentTxt.getWidth() + 50, 64, 15], true, "black");
		
	s.cacheAsBitmap(true);
	
	s.borderShape = new LShape();
	s.addChild(s.borderShape);
}

ArtNumber.prototype.select = function (v) {
	var s = this;
	
	s.cacheAsBitmap(false);

	if (v) {
		s.borderShape.filters = [new LDropShadowFilter(null, null, "#54D9EF")];
		s.borderShape.graphics.drawRoundRect(5, "#54D9EF", [0, 0, s.getWidth(), s.getHeight(), 10]);
	} else {
		s.borderShape.filters = [];
		s.borderShape.graphics.clear();
		
		s.cacheAsBitmap(true);
	}
};