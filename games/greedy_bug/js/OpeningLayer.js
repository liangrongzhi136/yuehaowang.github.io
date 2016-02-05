function OpeningLayer (
	backBitmapData,
	contentLayerX,
	contentLayerY,
	logoBitmapData,
	mainBtnBgBitmapDataList,
	aboutAndSettingsBtnBgBitmapDataList
) {
	var s = this;
	LExtends(s, LSprite, []);

	s.back = null;
	s.contentLayer = null;
	s.overLayer = null;
	s.logo = null;

	s.addBack(backBitmapData);
	s.addLayers(contentLayerX, contentLayerY);
	s.addLogo(logoBitmapData);
	s.addMainButtons(mainBtnBgBitmapDataList);
	s.addVLayout();
	s.addAboutAndSettingsBtn(aboutAndSettingsBtnBgBitmapDataList);
}
OpeningLayer.BACK = null;
OpeningLayer.LOGO = null;
OpeningLayer.CONTENT_LAYER_X = 0;
OpeningLayer.CONTENT_LAYER_Y = 0;
OpeningLayer.prototype.addBack = function (backBitmapData) {
	var s = this;

	s.back = new LBitmap(backBitmapData);
	s.addChild(s.back);
};
OpeningLayer.prototype.addLayers = function (contentLayerX, contentLayerY) {
	var s = this;

	s.contentLayer = new LSprite();
	s.contentLayer.x = contentLayerX;
	s.contentLayer.y = contentLayerY;
	s.addChild(s.contentLayer);

	s.overLayer = new LSprite();
	s.addChild(s.overLayer);
};
OpeningLayer.prototype.addLogo = function (logoBitmapData) {
	var s = this;

	s.logo = new LBitmap(logoBitmapData);
	s.contentLayer.addChild(s.logo);

	LTweenLite.to(s.logo, 0.5, {
		y : s.logo.y - 50,
		ease : Circ.easeOut
	});
};
OpeningLayer.prototype.addMainButtons = function (btnBgBitmapDataList) {
	var s = this,
	r = 0,
	btnBitmap,
	btnLabel = new Txt(null, null, "white", "normal"),
	contentLayerWidth = s.contentLayer.getWidth();

	btnLabel.stroke = true;
	btnLabel.lineWidth = 3;
	btnLabel.lineColor = "#1188FF";

	var buttonLayer = new LSprite();
	s.contentLayer.addChild(buttonLayer);

	btnBitmap = new LBitmap(btnBgBitmapDataList[0]);
	btnLabel.text = "Play";
	btnLabel.size = "15";
	btnLabel.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	r = btnBitmap.getWidth() / 2;
	var playBtn = new Button(btnBitmap);
	playBtn.setLabel(btnLabel.clone());
	playBtn.setFilterColor("purple");
	playBtn.addShape(LShape.ARC, [r, r, r]);
	buttonLayer.addChild(playBtn);
	playBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.mouseChildren = false;

		s.destroy(function () {
			addGameInterface(OpeningLayer.BACK_BITMAPDATA);
		});
	});

	btnBitmap = new LBitmap(btnBgBitmapDataList[1]);
	btnLabel.text = "Help";
	btnLabel.size = "12";
	r = btnBitmap.getWidth() / 2;
	var helpBtn = new Button(btnBitmap);
	helpBtn.setLabel(btnLabel.clone());
	helpBtn.setFilterColor("#0088FF");
	helpBtn.addShape(LShape.ARC, [r, r, r]);
	buttonLayer.addChild(helpBtn);
	helpBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.mouseChildren = false;

		s.destroy(function () {
			addHelpInterface(OpeningLayer.BACK_BITMAPDATA);
		});
	});

	btnBitmap = new LBitmap(btnBgBitmapDataList[2]);
	btnLabel.text = "Share";
	btnLabel.size = "15";
	btnLabel.heightMode = LTextField.HEIGHT_MODE_BOTTOM;
	r = btnBitmap.getWidth() / 2;
	var shareBtn = new Button(btnBitmap);
	shareBtn.setLabel(btnLabel.clone());
	shareBtn.setFilterColor("orangered");
	shareBtn.addShape(LShape.ARC, [r, r, r]);
	buttonLayer.addChild(shareBtn);
	shareBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.mouseChildren = false;

		s.destroy(function () {
			addShareInterface(OpeningLayer.BACK_BITMAPDATA);
		});
	});

	var list = buttonLayer.childList,
	height = buttonLayer.getHeight();
	var hlayout = new HBoxLayout(list, 20, height, "middle");
	hlayout.synchronous();

	buttonLayer.x = (contentLayerWidth - buttonLayer.getWidth()) / 2;

	var delay = 0;
	for (var k = 0, l = buttonLayer.childList.length; k < l; k++) {
		var o = buttonLayer.childList[k];
		o.originalWidth = o.getWidth();
		o.originalHeight = o.getHeight();
		o.originalX = o.x;
		o.originalY = o.y;
		o.scaleX = o.scaleY = 0;

		LTweenLite.to(o, 1.2, {
			scaleX : 1,
			scaleY : 1,
			delay : delay,
			ease : Back.easeOut,
			onUpdate : function (obj) {
				obj.x = obj.originalX + (obj.originalWidth - obj.getWidth()) * 0.5;
				obj.y = obj.originalY + (obj.originalHeight - obj.getHeight()) * 0.5;
			},
			onComplete : function (obj) {
				delete obj.originalX;
				delete obj.originalY;
				delete obj.originalWidth;
				delete obj.originalHeight;
			}
		});

		delay += 0.2;
	}
};
OpeningLayer.prototype.addVLayout = function () {
	var s = this;

	var vlayout = new VBoxLayout(s.contentLayer.childList, -10);
	vlayout.synchronous();
};
OpeningLayer.prototype.addAboutAndSettingsBtn = function (btnBgBitmapDataList) {
	var s = this
	btnBitmap = null,
	margin = 20;

	btnBitmap = new LBitmap(btnBgBitmapDataList[0]);
	var settingsBtn = new Button(btnBitmap);
	settingsBtn.x = margin;
	settingsBtn.y = margin;
	var r = settingsBtn.getWidth();
	settingsBtn.addShape(LShape.ARC, [r, r, r]);
	s.overLayer.addChild(settingsBtn);
	settingsBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.mouseChildren = false;

		s.destroy(function () {
			addSettingsInterface(OpeningLayer.BACK_BITMAPDATA);
		});
	});

	btnBitmap = new LBitmap(btnBgBitmapDataList[1]);
	var aboutBtn = new Button(btnBitmap);
	aboutBtn.x = s.getWidth() - aboutBtn.getWidth() - margin;
	aboutBtn.y = margin;
	s.overLayer.addChild(aboutBtn);
	aboutBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.mouseChildren = false;

		s.destroy(function () {
			addAboutInterface(OpeningLayer.BACK_BITMAPDATA);
		});
	});
};
OpeningLayer.prototype.destroy = function (onDestroy) {
	var s = this, completeTweenList = new Array();

	OpeningLayer.BACK_BITMAPDATA = s.back.bitmapData;
	OpeningLayer.CONTENT_LAYER_X = s.contentLayer.x;
	OpeningLayer.CONTENT_LAYER_Y = s.contentLayer.y;
	OpeningLayer.LOGO_BITMAPDATA = s.logo.bitmapData;

	var completeFunc = function (obj) {
		completeTweenList.push(1);
		if (completeTweenList.length == 2) {
			s.remove();
			onDestroy();
		}
	};

	LTweenLite.to(s.overLayer, 0.3, {
		y : -s.overLayer.getHeight(),
		onComplete : completeFunc
	})

	LTweenLite.to(s.contentLayer, 1, {
		y : LGlobal.height + s.contentLayer.y - s.contentLayer.startY(),
		onComplete : completeFunc
	});
};