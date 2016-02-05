function RadioBox (titleList) {
	var s = this;
	LExtends(s, LSprite, []);
	
	s.radio = new LRadio();
	s.addChild(s.radio);

	var indentX = 20, currentX = 0;
	for (var i = 0; i < titleList.length; i++) {
		var v = titleList[i];
		var radioChild = new LRadioChild(i);
		radioChild.scaleX = radioChild.scaleY = 1.5;
		radioChild.x = currentX + radioChild.getWidth() / 2;
		radioChild.y = radioChild.getHeight() / 2;
		s.radio.push(radioChild);
		radioChild.addEventListener(LMouseEvent.MOUSE_UP, function () {
			s.dispatchEvent(new LEvent(RadioBox.ON_CHANGE));
		});

		currentX += radioChild.getWidth() + indentX;

		var titleTxt = new Txt(v, 15, "white", "bold");
		titleTxt.filters = [new LDropShadowFilter(null, null, "orangered")];
		titleTxt.lineColor = "orange";
		titleTxt.lineWidth = 3;
		titleTxt.stroke = true;
		titleTxt.heightMode = LTextField.HEIGHT_MODE_BASELINE;
		titleTxt.x = currentX;
		s.addChild(titleTxt);

		currentX += titleTxt.getWidth() + indentX;
	}
}
RadioBox.ON_CHANGE = "onchange";