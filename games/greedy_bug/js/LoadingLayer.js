function LoadingLayer (backBitmapData, logoBitmapData) {
	var s = this;
	LExtends(s, LSprite, []);

	s.back = null;
	s.contentLayer = null;
	s.logo = null;
	s.loadingHintTxt = null;
	s.progressTxt = null;
	s.progressPie = null;

	s.addBack(backBitmapData);
	s.addContentLayer();
	s.addLogo(logoBitmapData);
	s.addLoadingHintTxt();
	s.addProgressTxt();
	s.addVLayout();
	s.addProgressPie();

	s.contentLayer.x = (LGlobal.width - s.contentLayer.getWidth()) * 0.5;
	s.contentLayer.y = (LGlobal.height - s.contentLayer.getHeight()) * 0.5;
}
LoadingLayer.prototype.addBack = function (backBitmapData) {
	var s = this;

	s.back = new LBitmap(backBitmapData);
	s.addChild(s.back);
};
LoadingLayer.prototype.addContentLayer = function () {
	var s = this;
	
	s.contentLayer = new LSprite();
	s.addChild(s.contentLayer);
};
LoadingLayer.prototype.addLogo = function (logoBitmapData) {
	var s = this;
	
	s.logo = new LBitmap(logoBitmapData);
	s.contentLayer.addChild(s.logo);
};
LoadingLayer.prototype.addLoadingHintTxt = function () {
	var s = this;
	
	s.loadingHintTxt = new Txt("LOADING……", 15, "white", "bold");
	s.loadingHintTxt.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	s.loadingHintTxt.filters = [new LDropShadowFilter(null, null, "white")];
	s.contentLayer.addChild(s.loadingHintTxt);
};
LoadingLayer.prototype.addProgressTxt = function () {
	var s = this;
	
	s.progressTxt = new Txt(null, 15, "white", null, "bold");
	s.progressTxt.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	s.contentLayer.addChild(s.progressTxt);

	s.loadingHintTextTween = LTweenLite.to(s.loadingHintTxt, 1, {
		delay : 0.5,
		alpha : 0.4,
		loop : true
	}).to(s.loadingHintTxt, 1, {
		alpha : 1
	});
};
LoadingLayer.prototype.addVLayout = function () {
	var s = this, layer = s.contentLayer;

	var layout = new VBoxLayout(layer.childList, 40, layer.getWidth(), "center");
	layout.synchronous();
};
LoadingLayer.prototype.addProgressPie = function () {
	var s = this;

	s.progressPie = new LShape();
	s.progressPie.alpha = 0.4;
	s.progressPie.x = s.logo.getWidth() / 2;
	s.progressPie.y = s.logo.getWidth() / 2;
	s.progressPie.rotate = -90;
	s.progressPie.graphics.drawArc(0, "", [0, 0, s.logo.getWidth() / 2, 0, Math.PI * 2, false, true], true, "black");
	s.contentLayer.addChild(s.progressPie);
};
LoadingLayer.prototype.setProgress = function (v) {
	var s = this;

	s.progressTxt.text = v + "%";
	s.progressTxt.x = (s.contentLayer.getWidth() - s.progressTxt.getWidth()) / 2;

	s.progressPie.graphics.clear();
	s.progressPie.graphics.drawArc(0, "", [0, 0, s.logo.getWidth() / 2, 0, Math.PI * 2 * (1 - v / 100), false, true], true, "black")
};
LoadingLayer.prototype.destroy = function (onDestroy) {
	var s = this,
	contentLayerX = s.contentLayer.x,
	completeTweenList = new Array();

	var completeFunc = function (obj) {
		completeTweenList.push(1);
		if (completeTweenList.length == 2) {
			s.remove();
			onDestroy();
		}
	};

	LTweenLite.remove(s.loadingHintTextTween);
	
	LTweenLite.to(s.loadingHintTxt, 1, {
		x :  -s.loadingHintTxt.getWidth() - s.loadingHintTxt.getRootCoordinate().x,
		ease : Strong.easeIn,
		onComplete : completeFunc
	});

	LTweenLite.to(s.progressTxt, 1, {
		x : LGlobal.width - contentLayerX + s.progressTxt.x,
		ease : Strong.easeIn,
		onComplete : completeFunc
	});
};