var ytHelpLayer = (function () {
	function ytHelpLayer () {
		var s = this;
		LExtends(s, LSprite, []);

		var backgroundBmp = new LBitmap(dataList["default_menu_background"]);
		backgroundBmp.scaleX = LGlobal.width / backgroundBmp.getWidth();
		backgroundBmp.scaleY = LGlobal.height / backgroundBmp.getHeight();
		s.addChild(backgroundBmp);

		var helpBmp = new LBitmap(dataList["help"]);
		helpBmp.y = 20;
		helpBmp.scaleX = helpBmp.scaleY = LGlobal.width / helpBmp.getWidth()
		s.addChild(helpBmp);

		s.addHelpTxt();
		s.addBtn();
	}

	ytHelpLayer.prototype.addHelpTxt = function () {
		var s = this,
		t = "点击左/右半边屏幕，使赛车移向左/右车道",
		tl = t.split(" ");

		var helpTxt = new LTextField();
		helpTxt.text = t;
		helpTxt.size = 15;
		helpTxt.color = "white";
		helpTxt.x = (LGlobal.width - helpTxt.getWidth()) * 0.5;
		helpTxt.y = 350;
		s.addChild(helpTxt);
	};

	ytHelpLayer.prototype.addBtn = function () {
		var s = this;

		var okTxt = new LTextField();
		okTxt.color = "white";
		okTxt.size = 20;
		okTxt.text = "返回";
		okTxt.weight = "bold";
		var okBtn = new ytButton(2, [okTxt, "center", "middle"], [0.6, 0.6]);
		okBtn.x = (LGlobal.width - okBtn.getWidth()) * 0.5;
		okBtn.y = LGlobal.height - okBtn.getHeight() - 30;
		s.addChild(okBtn);
		okBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
			addMenuInterface();

			s.remove();
		});
	};

	return ytHelpLayer;
})();