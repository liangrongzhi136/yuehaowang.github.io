function ResultBox (result, bgBitmapData, replayBtnBitmapData, backBtnBitmapData) {
	var s = this;
	LExtends(s, LSprite, []);

	s.contentLayer = null;

	s.back = null;
	s.replayBtn = null;
	s.backBtn = null;

	s.addBack(bgBitmapData);
	s.addContentLayer();
	s.addResultTxt(result);
	s.addButtons(replayBtnBitmapData, backBtnBitmapData);
	s.addVLayout();
}
ResultBox.prototype.addBack = function (bgBitmapData) {
	var s = this;

	s.back = new LBitmap(bgBitmapData);
	s.addChild(s.back);

	var border = new LShape();
	border.filters = [new LDropShadowFilter()]
	border.graphics.drawRect(5, "brown", [0, 0, s.getWidth(), s.getHeight()]);
	s.addChild(border);
};
ResultBox.prototype.addContentLayer = function () {
	var s = this;

	s.contentLayer = new LSprite();
	s.contentLayer.y = 50;
	s.addChild(s.contentLayer);
};
ResultBox.prototype.addResultTxt = function (result) {
	var s = this;

	var resultTxt = new Txt("Final Point: " + result, 20, "white", "normal");
	resultTxt.stroke = true;
	resultTxt.lineWidth = 3;
	resultTxt.lineColor = "#1188FF";
	resultTxt.filters = [new LDropShadowFilter()];
	s.contentLayer.addChild(resultTxt);
};
ResultBox.prototype.addButtons = function (replayBtnBitmapData, backBtnBitmapData) {
	var s = this,
	r = 0,
	btnBitmap = null,
	btnLabel = new Txt(null, 15, "white", "normal");

	btnLabel.stroke = true;
	btnLabel.lineWidth = 3;
	btnLabel.lineColor = "#1188FF";

	var buttonLayer = new LSprite();
	s.contentLayer.addChild(buttonLayer);

	btnBitmap = new LBitmap(replayBtnBitmapData);
	btnLabel.text = "Replay";
	r = btnBitmap.getWidth() / 2;
	var replayBtn = new Button(btnBitmap);
	replayBtn.setLabel(btnLabel.clone());
	replayBtn.setFilterColor("black");
	replayBtn.addShape(LShape.ARC, [r, r, r]);
	buttonLayer.addChild(replayBtn);
	replayBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.mouseChildren = false;

		if (s.parent && s.parent.parent) {
			s.parent.parent.destroy(function () {
				addGameInterface(OpeningLayer.BACK_BITMAPDATA);
			});
		}
	});

	btnBitmap = new LBitmap(backBtnBitmapData);
	btnLabel.text = "Back";
	r = btnBitmap.getWidth() / 2;
	var backBtn = new Button(btnBitmap);
	backBtn.setLabel(btnLabel.clone());
	backBtn.setFilterColor("#0088FF");
	backBtn.addShape(LShape.ARC, [r, r, r]);
	buttonLayer.addChild(backBtn);
	backBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.mouseChildren = false;
		
		if (s.parent && s.parent.parent) {
			s.parent.parent.destroy(function () {
				addOpeningInterface(
					OpeningLayer.BACK_BITMAPDATA,
					OpeningLayer.CONTENT_LAYER_X,
					OpeningLayer.CONTENT_LAYER_Y,
					OpeningLayer.LOGO_BITMAPDATA
				);
			});
		}
	});

	var list = buttonLayer.childList,
	height = buttonLayer.getHeight();
	var hlayout = new HBoxLayout(list, 20);
	hlayout.synchronous();
};
ResultBox.prototype.addVLayout = function () {
	var s = this;

	var layout = new VBoxLayout(s.contentLayer.childList, 70, s.getWidth(), "center");
	layout.synchronous();
};