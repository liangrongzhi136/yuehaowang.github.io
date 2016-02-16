function ShareLayer (level, time) {
	var s = this;
	LExtends(s, LSprite, []);

	s.level = level;
	s.time = time;
	s.rankingListLayer = null;

	s.addPostGradeLayer();
	s.addRankingList();
}

ShareLayer.prototype.addPostGradeLayer = function () {
	var s = this;

	var hint = new LTextField();
	hint.text = lang.PLEASE_INPUT_YOUR_NAME;
	hint.size = 40;
	hint.x = LGlobal.width / 2;
	hint.y = 200;
	hint.textAlign = "center";
	hint.color = "#E6DB74";
	hint.weight = "bold";
	s.addChild(hint);

	var gradeTxt = new LTextField();
	gradeTxt.text = s.time.toString();
	gradeTxt.size = 25;
	gradeTxt.color = "#FD9720";
	gradeTxt.x = LGlobal.width / 2;
	gradeTxt.y = 280;
	gradeTxt.textAlign = "center";
	s.addChild(gradeTxt);

	var inputBoxLayer = new LSprite();
	inputBoxLayer.graphics.drawRoundRect(3, "#FFFFFF", [0, 0, 300, 50, 5], true, "#FFFFFF");
	inputBoxLayer.filters = [new LDropShadowFilter(null, null, "#000000")];
	var inputBox = new LTextField();
	inputBox.size = 40;
	inputBox.setType(LTextFieldType.INPUT, inputBoxLayer);
	inputBox.x = (LGlobal.width - inputBoxLayer.getWidth()) / 2;
	inputBox.y = 350;
	s.addChild(inputBox);

	var btn = new LButtonSample1(lang.SUBMIT, 30);
	btn.width = 300;
	btn.height = 50;
	btn.x = (LGlobal.width - btn.width) / 2;
	btn.y = 430;
	s.addChild(btn);

	btn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		var content = inputBox.text;

		if (content.length > 6) {
			alert(lang.INPUT_LESS_THAN_SIX);

			return;
		} else if (content.length <= 0) {
			alert(lang.PLEASE_INPUT_YOUR_NAME);

			return;
		}

		if (content.search(/[/\"';,.]/) >= 0) {
			alert(lang.ILLEGAL_CHARACTERS);

			return;
		}

		hint.text = lang.SUBMITTING;

		inputBox.visible = false;
		gradeTxt.visible = false;
		btn.visible = false;

		LAjax.post(
			"http://yuehaowang.applinzi.com/ranking",
			{
				cmd : "set",
				gameName : "the_best_arithmetic",
				level : s.level,
				sortMethod : "ASC",
				username : content,
				grade : parseInt(Time.toMs(s.time))
			},
			function (d) {
				var ranking = ShareLayer.getStr(d);

				hint.text = lang.PLEASE_INPUT_YOUR_NAME;

				gradeTxt.visible = true;
				btn.visible = true;
				inputBox.visible = true;

				if (ranking.search(/Error: /) >= 0) {
					if (ranking == "Error: 603") {
						alert(lang.REPEATED_NAME);
					} else {
						alert("Error!");
					}

					return;
				}

				hint.text = lang.SUBMITTED_SUCCESSFULLY;

				var rankingTitleTxt = gradeTxt.clone();
				rankingTitleTxt.text = lang.YOUR_RANKING;
				s.addChild(rankingTitleTxt);

				var rankingTxt = gradeTxt.clone();
				rankingTxt.text = ranking.toString();
				rankingTxt.y += 60;
				rankingTxt.size = 50;
				rankingTxt.weight = "bold";
				s.addChild(rankingTxt);

				gradeTxt.remove();
				inputBox.remove();

				btn.setLabel(lang.BACK);
				btn.removeAllEventListener();
				btn.addEventListener(LMouseEvent.MOUSE_UP, function () {
					s.remove();

					var beginningLayer = addBeginningLayer();
					beginningLayer.gotoLevelLayer();
				});

				s.rankingListLayer.remove();

				s.addRankingList();
			},
			function () {
				alert("Error!");
			}
		);
	});
};

ShareLayer.prototype.addRankingList = function () {
	var s = this, viewW = 370, viewH = 240;

	s.rankingListLayer = new LSprite();
	s.rankingListLayer.y = 530;
	s.addChild(s.rankingListLayer);

	var title = new LTextField();
	title.size = 30;
	title.color = "#FFFFFF";
	title.text = lang.RANKING_LIST;
	title.x = (LGlobal.width - title.getWidth()) / 2;
	s.rankingListLayer.addChild(title);

	var rankingListView = new LListView();
	rankingListView.resize(viewW, viewH);
	rankingListView.cellWidth = viewW;
	rankingListView.cellHeight = 43;
	rankingListView.arrangement = LListView.Direction.Horizontal;
	rankingListView.movement = LListView.Direction.Vertical;
	rankingListView.x = (LGlobal.width - viewW) / 2;
	rankingListView.y = 50;
	rankingListView.graphics.drawRoundRect(3, "#000000", [-3, -3, viewW + 13, viewH + 5, 10], true, "#000000");
	s.rankingListLayer.addChild(rankingListView);

	var hint = new LTextField();
	hint.text = lang.REFRESHING;
	hint.size = 20;
	hint.color = "white";
	hint.textAlign = "center";
	hint.x = 185;
	hint.y = 105;
	rankingListView.addChild(hint);

	LAjax.post(
		"http://yuehaowang.applinzi.com/ranking",
		{
			cmd : "get",
			gameName : "the_best_arithmetic",
			level : s.level,
			from : 1,
			sortMethod : "ASC",
			to : 10
		},
		function (d) {
			var resultTxt = ShareLayer.getStr(d);

			if (resultTxt.search(/Error: /) >= 0) {
				alert("Error!");

				return;
			}

			var rankingList = ShareLayer.getRankingList(resultTxt);

			if (rankingList.length <= 0) {
				hint.text = lang.NO_RANKING;

				return;
			}

			hint.remove();

			for (var i = 0, l = rankingList.length; i < l; i++) {
				var medal = null;

				if (i == 0) {
					medal = "gold";
				} else if (i == 1) {
					medal = "silver";
				} else if (i == 2) {
					medal = "bronze";
				}

				var childView = new RankingListChildView(rankingList[i], medal);
				rankingListView.insertChildView(childView);
			}
		},
		function () {
			alert("Error!");
		}
	);
};

ShareLayer.getStr = function (data) {
	var splitList = data.split("<script");

	data = splitList[0];

	return data;
};

ShareLayer.getRankingList = function (str) {
	var result = new Array();
	var splitList = str.split(";");

	for (var i = 0, l = splitList.length - 1; i < l; i++) {
		var o = splitList[i];

		oList = o.split(",");

		if (oList.lenght <= 1) {
			continue;
		}

		result.push({
			username : oList[0],
			grade : parseInt(oList[1])
		});
	}

	return result;
};
