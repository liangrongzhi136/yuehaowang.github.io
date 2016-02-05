function AboutLayer (backBitmapData, backBtnBitmapData) {
	var s = this;
	LExtends(s, LSprite, []);

	s.contentLayer = null;

	s.addBack(backBitmapData);
	s.addContentLayer();
	s.addContent();
	s.addBackButton(backBtnBitmapData);
}
AboutLayer.prototype.addBack = function (backBitmapData) {
	var s = this;

	var back = new LBitmap(backBitmapData);
	s.addChild(back);
};
AboutLayer.prototype.addContentLayer = function () {
	var s = this;

	s.contentLayer = new LSprite();
	s.addChild(s.contentLayer);
};
AboutLayer.prototype.addContent = function () {
	var s = this;

	var txtTemplate = new Txt(null, 15, "white", "bold");
	txtTemplate.lineColor = "#1188FF";
	txtTemplate.lineWidth = 3;
	txtTemplate.stroke = true;
	txtTemplate.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	txtTemplate.filters = [new LDropShadowFilter(null, null, "#0088FF")];

	var leftSideLayer = new LSprite();
	s.contentLayer.addChild(leftSideLayer);
	var rightSideLayer = new LSprite();
	s.contentLayer.addChild(rightSideLayer);

	var directorTxt = txtTemplate.clone();
	directorTxt.text = "Director : Yorhom";
	leftSideLayer.addChild(directorTxt);

	var programmerTxt = txtTemplate.clone();
	programmerTxt.text = "Programmer : Yorhom";
	leftSideLayer.addChild(programmerTxt);

	var materialTxt = txtTemplate.clone();
	materialTxt.text = "Material : From Internet";
	leftSideLayer.addChild(materialTxt);

	var musicTxt = txtTemplate.clone();
	musicTxt.text = "Music : 竹竿舞 - Jay Chou";
	leftSideLayer.addChild(musicTxt);

	var leftLayout = new VBoxLayout(leftSideLayer.childList, 25);
	leftLayout.synchronous();

	var testersTxt = txtTemplate.clone();
	testersTxt.text = "Testers : Peter, Clint, Yuetong";
	rightSideLayer.addChild(testersTxt);

	var gameEngineTxt = txtTemplate.clone();
	gameEngineTxt.text = "Game Engine : lufylegend.js v1.9.7";
	rightSideLayer.addChild(gameEngineTxt);

	var emailUsTxt = txtTemplate.clone();
	emailUsTxt.text = "Email Us : wangyuehao1999@gmail.com";
	rightSideLayer.addChild(emailUsTxt);

	var blogTxt = txtTemplate.clone();
	blogTxt.text = "Blog : http://blog.csdn.net/yorhomwang";
	rightSideLayer.addChild(blogTxt);

	var rightLayout = new VBoxLayout(rightSideLayer.childList, 25);
	rightLayout.synchronous();

	var hlayout = new HBoxLayout(s.contentLayer.childList, 60, s.getHeight() - 50, "middle");
	hlayout.synchronous();

	var vlayout = new VBoxLayout([s.contentLayer], 0, s.getWidth(), "center");
	vlayout.synchronous();
};
AboutLayer.prototype.addBackButton = function (backBtnBitmapData) {
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
AboutLayer.prototype.destroy = function (onDestroy) {
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