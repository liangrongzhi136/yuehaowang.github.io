function ShareLayer (backBitmapData, backBtnBitmapData, shareBtnBitmapDataList) {
	var s = this;
	LExtends(s, LSprite, []);

	s.contentLayer = null;

	s.addBack(backBitmapData);
	s.addContentLayer();
	s.addShareBtns(shareBtnBitmapDataList);
	s.addBackButton(backBtnBitmapData);
}
ShareLayer.prototype.addBack = function (backBitmapData) {
	var s = this;

	var back = new LBitmap(backBitmapData);
	s.addChild(back);
};
ShareLayer.prototype.addContentLayer = function () {
	var s = this;

	s.contentLayer = new LSprite();
	s.addChild(s.contentLayer);
};
ShareLayer.prototype.addShareBtns = function (btnBitmapDataList) {
	var s = this, shareTypeList = ["twitter", "facebook"];

	for (var k = 0; k < btnBitmapDataList.length; k++) {
		var currentBitmapData = btnBitmapDataList[k],
		bitmap = new LBitmap(currentBitmapData);

		var btn = new Button(bitmap);
		btn.name = shareTypeList[k] ? shareTypeList[k] : "";
		s.contentLayer.addChild(btn);
		btn.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
			s.share(e.currentTarget.name);
		});
	}

	var hlayout = new HBoxLayout(s.contentLayer.childList, 30, s.getHeight(), "middle");
	hlayout.synchronous();

	var vlayout = new VBoxLayout([s.contentLayer], 0, s.getWidth(), "center");
	vlayout.synchronous();
};
ShareLayer.prototype.share = function (type) {
	var name = "Greedy Bug",
	en = encodeURIComponent,
	l = document.location.href;

	var s = screen;
	var imageUrl = "./images/logo.png";
	var content = [name, " is a puzzle game. This game may test your response capability and planning capacity. How much point can you get? Try it~"].join("");
	var url = "";
	var w = 700;
	var h = 470;

	if (type == "twitter") {
		url = ["https://twitter.com/intent/tweet?original_referer=", en(""), "&url=", en(l), "&text=", en(content), "&pic=", en(imageUrl)].join("");
	} else if (type == "facebook") {
		url = ["http://www.facebook.com/share.php?u=", en(l), "&description=", en(content), "&pic=", en(imageUrl)].join("");
	}
	
	var openWindow = function () {
		if (
			!window.open(
				url,
				type,
				["toolbar=0,resizable=1,status=0,width=", w, ",height=", h, ",left=", (s.width - w) / 2, ",top=", (s.height - h) / 2].join("")
			)
		) {
			document.location.href = url;
		}
	}

	if (/Firefox/.test(navigator.userAgent)) {
		setTimeout(openWindow, 0);
	} else {
		openWindow();
	}
};
ShareLayer.prototype.addBackButton = function (backBtnBitmapData) {
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
ShareLayer.prototype.destroy = function (onDestroy) {
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