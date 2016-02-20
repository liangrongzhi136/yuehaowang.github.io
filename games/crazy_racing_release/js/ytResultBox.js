var ytResultBox = (function () {
	function ytResultBox (point) {
		var s = this;
		LExtends(s, LSprite, []);

		s.point = point;
		s.ranking = null;

		var backgroundBmp = new LBitmap(dataList["default_menu_background"]);
		backgroundBmp.scaleX = backgroundBmp.scaleY = 0.55;
		s.addChild(backgroundBmp);

		s.filters = [new LDropShadowFilter()];

		s.txtTemplate = new LTextField();
		s.txtTemplate.color = "white";
		s.txtTemplate.weight = "bold";

		s.txtLayer = new LSprite();
		s.addChild(s.txtLayer);

		s.btnLayer = new LSprite();
		s.addChild(s.btnLayer);

		s.addResult(point);
		s.addBtns(point);
	}

	ytResultBox.prototype.addResult = function (point) {
		var s = this;

		s.txtLayer.y = 50;

		var titleTxt = s.txtTemplate.clone();
		titleTxt.text = "飚车路程";
		titleTxt.size = 30;
		titleTxt.x = (s.getWidth() - titleTxt.getWidth()) / 2;
		s.txtLayer.addChild(titleTxt);
		
		var pointTxt = s.txtTemplate.clone();
		pointTxt.size = 30;
		pointTxt.text = point + " m";
		pointTxt.x = (s.getWidth() - pointTxt.getWidth()) / 2;
		pointTxt.y = titleTxt.getHeight() + 20;
		s.txtLayer.addChild(pointTxt);

		var rankingTxt = s.txtTemplate.clone();
		rankingTxt.size = 15;
		rankingTxt.text = "排名获取中";
		rankingTxt.x = (s.getWidth() - rankingTxt.getWidth()) / 2;
		rankingTxt.y = pointTxt.y + pointTxt.getHeight() + 25;
		s.txtLayer.addChild(rankingTxt);

		LAjax.post(
			"http://yuehaowang.applinzi.com/ranking",
			{
				cmd : "set",
				gameName : "crazy_racing",
				level : 0,
				sortMethod : "DESC",
				username : "id" + Math.floor(Math.random() * 100000) + (new Date()).getTime(),
				grade : parseInt(point)
			},
			function (d) {
				var ranking = ytResultBox.getStr(d);

				if (ranking > 10000) {
					ranking = "千里之外";
				}

				s.ranking = ranking;

				rankingTxt.text = "你的排名：" + ranking;
				rankingTxt.x = (s.getWidth() - rankingTxt.getWidth()) / 2;
			},
			function () {
				rankingTxt.text = "获取失败，请检查网络";
				rankingTxt.x = (s.getWidth() - rankingTxt.getWidth()) / 2;
			}
		);
	};

	ytResultBox.EVENT_CLICK_BUTTON = "event_click_button";

	ytResultBox.getStr = function (data) {
		var splitList = data.split("<script");

		data = splitList[0];

		return data;
	};

	ytResultBox.prototype.addBtns = function () {
		var s = this;

		s.btnLayer.y = s.txtLayer.y + s.txtLayer.getHeight() + 50;

		var btnTxtList = [
			"重玩本局",
			"返回菜单",
			"分享成绩"
		];

		for (var k = 0, btnY = 0; k < btnTxtList.length; k++) {
			var btnTxt = s.txtTemplate.clone();
			btnTxt.size = 15;
			btnTxt.text = btnTxtList[k];
			var btn = new ytButton(1, [btnTxt, "center", "middle"], [0.5, 0.5]);
			btn.index = k;
			btn.x = (s.getWidth() - btn.getWidth()) * 0.5;
			btn.y = btnY;
			s.btnLayer.addChild(btn);

			btn.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
				var eve = new LEvent(ytResultBox.EVENT_CLICK_BUTTON);
				eve.msg = e.currentTarget.index;
				eve.point = s.point;
				eve.ranking = s.ranking;

				s.dispatchEvent(eve);
			});

			btnY += btn.getHeight() + 20;
		}
	};

	return ytResultBox;
})();