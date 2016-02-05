function SettingsLayer (backBitmapData, backBtnBitmapData) {
	var s = this;
	LExtends(s, LSprite, []);

	s.contentLayer = null;

	s.titleTxtTemplate = new Txt(null, 20, "white", "bold");
	s.titleTxtTemplate.filters = [new LDropShadowFilter(null, null, "#1188FF")];
	s.titleTxtTemplate.lineColor = "#1188FF";
	s.titleTxtTemplate.lineWidth = 3;
	s.titleTxtTemplate.stroke = true;
	s.titleTxtTemplate.heightMode = LTextField.HEIGHT_MODE_BASELINE;

	s.addBack(backBitmapData);
	s.addContentLayer();
	s.addMusicSettings();
	s.addSpeedSettings();
	s.addLayout();
	s.addBackButton(backBtnBitmapData);
}
SettingsLayer.MUSIC = 0;
SettingsLayer.SPEED = 1;
SettingsLayer.prototype.addBack = function (backBitmapData) {
	var s = this;

	var back = new LBitmap(backBitmapData);
	s.addChild(back);
};
SettingsLayer.prototype.addContentLayer = function () {
	var s = this;

	s.contentLayer = new LSprite();
	s.addChild(s.contentLayer);
};
SettingsLayer.prototype.addMusicSettings = function () {
	var s = this;

	var musicSettingsLayer = new LSprite();
	s.contentLayer.addChild(musicSettingsLayer);

	var titleTxt = s.titleTxtTemplate.clone();
	titleTxt.text = "Music: ";
	musicSettingsLayer.addChild(titleTxt);

	var radioBox = new RadioBox(["ON", "OFF"]);
	radioBox.radio.setValue(SettingsLayer.MUSIC);
	radioBox.addEventListener(RadioBox.ON_CHANGE, function (e) {
		var radio = e.currentTarget.radio, v = radio.value;

		if (v != SettingsLayer.MUSIC) {
			if (v == 0) {
				if (SoundManager.LOAD_OVER) {
					SoundManager.play(SoundManager.BG_MUSIC, true);
				} else {
					SoundManager.loadSound();
				}
			} else if (v == 1) {
				if (SoundManager.LOAD_OVER) {
					SoundManager.close(SoundManager.BG_MUSIC);
				}
			}
		}

		SettingsLayer.MUSIC = v;
	});
	musicSettingsLayer.addChild(radioBox);

	var layerLayout = new HBoxLayout(musicSettingsLayer.childList, 30);
	layerLayout.synchronous();
};
SettingsLayer.prototype.addSpeedSettings = function () {
	var s = this;

	var speedSettingsLayer = new LSprite();
	s.contentLayer.addChild(speedSettingsLayer);

	var titleTxt = s.titleTxtTemplate.clone();
	titleTxt.text = "Speed: ";
	speedSettingsLayer.addChild(titleTxt);

	var radioBox = new RadioBox(["60 FPS", "30 FPS", "20 FPS"]);
	radioBox.radio.setValue(SettingsLayer.SPEED);
	radioBox.addEventListener(RadioBox.ON_CHANGE, function (e) {
		var radio = e.currentTarget.radio, v = radio.value;

		if (v != SettingsLayer.SPEED) {
			if (v == 0) {
				LGlobal.setFrameRate(1000 / 60);
			} else if (v == 1) {
				LGlobal.setFrameRate(1000 / 30);
			} else if (v == 2) {
				LGlobal.setFrameRate(1000 / 20);
			}
		}

		SettingsLayer.SPEED = v;
	});
	speedSettingsLayer.addChild(radioBox);

	var layerLayout = new HBoxLayout(speedSettingsLayer.childList, 30);
	layerLayout.synchronous();
};
SettingsLayer.prototype.addLayout = function () {
	var s = this;

	s.contentLayer.x = (s.getWidth() - s.contentLayer.getWidth()) / 2;

	var vlayout = new VBoxLayout(s.contentLayer.childList, 20);
	vlayout.synchronous();

	var hlayout = new HBoxLayout([s.contentLayer], 0, s.getHeight() - 50, "middle");
	hlayout.synchronous();
};
SettingsLayer.prototype.addBackButton = function (backBtnBitmapData) {
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
SettingsLayer.prototype.destroy = function (onDestroy) {
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