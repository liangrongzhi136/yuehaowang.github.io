function HelpLayer (backBitmapData, directionBitmapDataList, backBtnBitmapData) {
	var s = this;
	LExtends(s, LSprite, []);

	s.contentLayer = null;

	s.directionBitmapDataList = directionBitmapDataList;

	s.addBack(backBitmapData);
	s.addContentLayer();
	s.addPcDirectionCtrlInstruction();
	s.addMobileDirectionCtrlInstruction();
	s.addLayouts();
	s.addBackButton(backBtnBitmapData);
}
HelpLayer.prototype.addBack = function (backBitmapData) {
	var s = this;

	var back = new LBitmap(backBitmapData);
	s.addChild(back);
};
HelpLayer.prototype.addContentLayer = function () {
	var s = this;

	s.contentLayer = new LSprite();
	s.addChild(s.contentLayer);
};
HelpLayer.prototype.addPcDirectionCtrlInstruction = function () {
	var s = this;

	var pcInstructionLayer = new LSprite();
	s.contentLayer.addChild(pcInstructionLayer);

	var bitmapW = s.directionBitmapDataList[0].width, bitmapH = bitmapW;

	var titleTxt = new Txt("For PC", 20, "white", "bold");
	titleTxt.lineColor = "#1188FF";
	titleTxt.lineWidth = 5;
	titleTxt.stroke = true;
	titleTxt.filters = [new LDropShadowFilter(null, null, "#1188FF")];
	pcInstructionLayer.addChild(titleTxt);

	var directionBitmapLayer = new LSprite();
	pcInstructionLayer.addChild(directionBitmapLayer);

	var upDirectionBitmap = new LBitmap(s.directionBitmapDataList[0]);
	upDirectionBitmap.x = bitmapW;
	directionBitmapLayer.addChild(upDirectionBitmap);
	var downDirectionBitmap = new LBitmap(s.directionBitmapDataList[1]);
	downDirectionBitmap.y = bitmapH;
	directionBitmapLayer.addChild(downDirectionBitmap);
	var leftDirectionBitmap = new LBitmap(s.directionBitmapDataList[2]);
	leftDirectionBitmap.x = bitmapW;
	leftDirectionBitmap.y = bitmapH;
	directionBitmapLayer.addChild(leftDirectionBitmap);
	var leftDirectionBitmap = new LBitmap(s.directionBitmapDataList[3]);
	leftDirectionBitmap.x = bitmapW * 2;
	leftDirectionBitmap.y = bitmapH;
	directionBitmapLayer.addChild(leftDirectionBitmap);

	var layout = new VBoxLayout(pcInstructionLayer.childList, 50);
	layout.synchronous();

	var borderMargin = 20;
	pcInstructionLayer.graphics.drawRoundRect(5, "brown", [
		-borderMargin,
		-borderMargin,
		pcInstructionLayer.getWidth() + borderMargin * 2,
		pcInstructionLayer.getHeight() + borderMargin * 2, 5
	]);
};
HelpLayer.prototype.addMobileDirectionCtrlInstruction = function () {
	var s = this;

	var mobileInstructionLayer = new LSprite();
	s.contentLayer.addChild(mobileInstructionLayer);

	var titleTxt = new Txt("For Mobile Device", 20, "white", "bold");
	titleTxt.lineColor = "#1188FF";
	titleTxt.lineWidth = 5;
	titleTxt.stroke = true;
	titleTxt.filters = [new LDropShadowFilter(null, null, "#1188FF")];
	mobileInstructionLayer.addChild(titleTxt);

	var instruction = "Slide your finger towards the direction you want the bug to move on the screen.";
	var instructionTxt = new Txt(instruction, 15, "white");
	instructionTxt.setWordWrap(true, 25);
	instructionTxt.width = 400;
	mobileInstructionLayer.addChild(instructionTxt);

	var layout = new VBoxLayout(mobileInstructionLayer.childList, 50);
	layout.synchronous();

	var borderMargin = 20;
	mobileInstructionLayer.graphics.drawRoundRect(5, "brown", [
		-borderMargin,
		-borderMargin,
		mobileInstructionLayer.getWidth() + borderMargin * 2,
		mobileInstructionLayer.getHeight() + borderMargin * 2, 5
	]);
};
HelpLayer.prototype.addLayouts = function () {
	var s = this;

	var hLayout = new HBoxLayout(s.contentLayer.childList, 30, s.getHeight(), "middle");
	hLayout.synchronous();

	var vLayout = new VBoxLayout([s.contentLayer], 0, s.getWidth(), "center");
	vLayout.synchronous();

	s.contentLayer.x += (s.contentLayer.x - s.contentLayer.startX()) / 2;
};
HelpLayer.prototype.addBackButton = function (backBtnBitmapData) {
	var s = this;

	var btnBitmap = new LBitmap(backBtnBitmapData);
	
	var btnLabel = new Txt("Back", 15, "white", "normal");
	btnLabel.stroke = true;
	btnLabel.lineWidth = 3;
	btnLabel.lineColor = "#1188FF";

	var margin = 20, r = btnBitmap.getWidth() / 2;

	var backBtn = new Button(btnBitmap);
	backBtn.x = s.getWidth() - backBtn.getWidth() - margin;
	backBtn.y = s.getHeight() - backBtn.getHeight() - margin;
	backBtn.setLabel(btnLabel.clone());
	backBtn.setFilterColor("#0088FF");
	backBtn.addShape(LShape.ARC, [r, r, r]);
	s.addChild(backBtn);
	backBtn.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
		e.currentTarget.mouseEnabled = false;

		s.destroy(function () {
			addOpeningInterface(
				OpeningLayer.BACK_BITMAPDATA,
				OpeningLayer.CONTENT_LAYER_X,
				OpeningLayer.CONTENT_LAYER_Y,
				OpeningLayer.LOGO_BITMAPDATA
			);
		});
	});
};
HelpLayer.prototype.destroy = function (onDestroy) {
	var s = this;

	var curtain = new LShape();
	curtain.alpha = 0;
	curtain.graphics.drawRect(0, "", [0, 0, s.getWidth(), s.getHeight()], true, "black");
	addChild(curtain);

	LTweenLite.to(curtain, 0.5, {
		alpha : 1,
		onComplete : function (obj) {
			s.remove();
			onDestroy();

			if (obj.parent) {
				obj.parent.setChildIndex(obj, 1);
			}
		}
	}).to(curtain, 0.5, {
		alpha : 0,
		onComplete : function (obj) {
			obj.remove();
		}
	});
};