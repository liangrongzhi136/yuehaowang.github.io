function GameLayer (level) {
	var s = this;
	LExtends(s, LSprite, []);

	s.x = 45;
	s.y = 60;

	s.level = level;
	s.currentLevelData = levelData[s.level];
	s.blockMap = new Array();
	s.emptyPositionList = new Array();
	s.time = new Time();
	s.formularLayer = null;
	s.timeTxt = null;
	s.selectedBlock = null;
	s.isPause = false;
	s.pauseBtn = null;
	s.hpLayer = null;

	s.blockLayer = new LSprite();
	s.addChild(s.blockLayer);

	s.overLayer = new LSprite();
	s.addChild(s.overLayer);

	s.createBlockMap();
	s.getEmptyPositionList();
	s.addPauseBtn();
	s.createPauseMenuLayer();
	s.addBlocks();
	s.addTimeTxt();
	s.addFormularTxt();
	s.addHpLayer();

	s.addEventListener(LEvent.ENTER_FRAME, s.loop);
}

GameLayer.COLOR_LIST = ["#FFFFFF", "#F92672", "#87E22E", "#54D9EF", "#FD9720", "#E6DB74"];

GameLayer.prototype.createBlockMap = function () {
	var m = this.blockMap;

	for (var i = 0; i < 7; i++) {
		m.push([0, 0]);
	}
};

GameLayer.prototype.getEmptyPositionList = function () {
	var s = this;

	for (var i = 0; i < s.blockMap.length; i++) {
		for (var j = 0, l = s.blockMap[i].length; j < l; j++) {
			if (s.blockMap[i][j] == 0) {
				s.emptyPositionList.push([j, i]);
			}
		}
	}
};

GameLayer.prototype.addPauseBtn = function () {
	var s = this;

	s.pauseBtn = new PauseButton();
	s.pauseBtn.x = 415;
	s.pauseBtn.y = 20;
	addChild(s.pauseBtn);

	s.pauseBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		var v = !s.isPause;

		s.pauseBtn.setPause(v);
		s.pause(v);
	});
};

GameLayer.prototype.createPauseMenuLayer = function () {
	var s = this, m = 190;

	s.pauseMenuLayer = new LSprite();
	s.pauseMenuLayer.visible = false;
	s.pauseMenuLayer.x = 500;
	s.pauseMenuLayer.originalX = s.pauseMenuLayer.x;
	s.overLayer.addChild(s.pauseMenuLayer);

	var backBtn = new BitmapSprite("back_icon");
	backBtn.x = 130;
	backBtn.y = 200;
	s.pauseMenuLayer.addChild(backBtn);

	backBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.remove();
		s.pauseBtn.remove();

		var beginningLayer = addBeginningLayer();
		beginningLayer.gotoLevelLayer();
	});

	var replayBtn = new BitmapSprite("replay_icon");
	replayBtn.x = backBtn.x;
	replayBtn.y = backBtn.y + m;
	s.pauseMenuLayer.addChild(replayBtn);

	replayBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.remove();
		s.pauseBtn.remove();

		startLevel(s.level);
	});
};

GameLayer.prototype.addBlocks = function () {
	var s = this;

	var color = "white", n = s.blockMap.length;

	for (var i = 0; i < n; i++) {
		var x = s.getX();

		s.createBlock(x);
		s.createBlock(s.getY(x));
	}

	s.blockLayer.y = 80;
	s.blockLayer.originalX = s.blockLayer.x;

	s.blockLayer.addEventListener(LMouseEvent.MOUSE_UP, s.onClickBlockLayer);
};

GameLayer.prototype.createBlock = function (n) {
	var s = this, color = GameLayer.getColor();

	var an = new ArtNumber(n, color);
	s.getRandomPosition(an);
	s.blockLayer.addChild(an);	
};

GameLayer.prototype.addTimeTxt = function () {
	var s = this;

	s.timeTxt = new LTextField();
	s.timeTxt.text = s.time.toString();
	s.timeTxt.textAlign = "center";
	s.timeTxt.color = "#E6DB74";
	s.timeTxt.size = 30;
	s.timeTxt.weight = "italic bold";
	s.timeTxt.x = (LGlobal.width - 100) / 2;
	s.timeTxt.y = 670;
	s.overLayer.addChild(s.timeTxt);
};

GameLayer.prototype.addFormularTxt = function () {
	var s = this;

	s.formularLayer = new LSprite();
	s.formularLayer.y = 730;
	s.overLayer.addChild(s.formularLayer);

	var iconBmp = new LBitmap(new LBitmapData(dataList["formula_icon"]));
	s.formularLayer.addChild(iconBmp);

	var txt = new LTextField();
	txt.x = iconBmp.getWidth() + 20;
	txt.y = 20;
	txt.text = s.currentLevelData.formularTxt;
	txt.color = "white";
	txt.size = 27;
	s.formularLayer.addChild(txt);
};

GameLayer.prototype.addHpLayer = function () {
	var s = this;

	s.hpLayer = new HpLayer();
	s.hpLayer.x = s.hpLayer.y = 20;
	s.addChild(s.hpLayer);
};

GameLayer.getColor = function () {
	var l = GameLayer.COLOR_LIST, n = Math.random();

	if (n < 0.17) {
		return l[0];
	} else if (n < 0.34) {
		return l[1];
	} else if (n < 0.51) {
		return l[2];
	} else if (n < 0.68) {
		return l[3];
	} else if (n < 0.85) {
		return l[4];
	} else {
		return l[5];
	}
};

GameLayer.prototype.getX = function () {
	var s = this, ld = s.currentLevelData, nr = ld.n, dr = ld.d;
	var n = nr[0] + Math.floor((nr[1] - nr[0]) * Math.random()),
	d = dr[0] + Math.floor((dr[1] - dr[0]) * Math.random());

	return new Fraction(n, d);
};

GameLayer.prototype.getY = function (x) {
	return this.currentLevelData.getResult(x.clone());
};

GameLayer.prototype.getRandomPosition = function (o) {
	var s = this, el = s.emptyPositionList, i = Math.floor(Math.random() * el.length), item = el[i];

	o.x = item[0] * 210;
	o.y = item[1] * 80;

	el.splice(i, 1);
};

GameLayer.prototype.loop = function (e) {
	var s = e.currentTarget, l, mt = st = mst = "";

	if (s.isPause) {
		return;
	}

	s.time.tick();

	s.timeTxt.text = s.time.toString();
};

GameLayer.prototype.onClickBlockLayer = function (e) {
	var s = e.currentTarget.parent, t = e.target;

	if (s.isPause) {
		return;
	}

	if (!t || !(t instanceof ArtNumber)) {
		return;
	}

	if (s.selectedBlock) {
		var v1 = s.selectedBlock.value, v2 = t.value;
		
		if (s.getY(v1).is(v2) || s.getY(v2).is(v1)) {
			t.select(true);

			s.blocksVanish(s.selectedBlock, t);

			s.selectedBlock = null;

			return;
		} else {
			s.hpLayer.reduceHp();

			if (s.hpLayer.value <= 0) {
				s.gameOver(false);

				return;
			}
		}

		s.selectedBlock.select(false);
	}

	s.selectedBlock = t;

	s.selectedBlock.select(true);
};

GameLayer.prototype.blocksVanish = function (o1, o2) {
	var s = this, l = [o1, o2];

	for (var i = 0; i < l.length; i++) {
		var o = l[i], toX;

		if (o.x < 200) {
			toX = -250;
		} else {
			toX = 500;
		}

		LTweenLite.to(o, 0.5, {
			x : toX,
			ease : LEasing.Back.easeIn,
			onComplete : function (ob) {
				ob.remove();

				if (s.blockLayer.numChildren <= 0) {
					s.gameOver(true);
				}
			}
		});
	}
};

GameLayer.prototype.gameOver = function (isWin) {
	var s = this;

	s.pauseBtn.mouseEnabled = false;
	s.isPause = true;

	LTweenLite.to(s.formularLayer, 0.2, {
		y : 900,
		onComplete : function () {
			s.formularLayer.remove();
		}
	});

	LTweenLite.to(s.pauseBtn, 0.2, {
		x : 500,
		onComplete : function () {
			s.pauseBtn.remove();
		}
	});

	if (!isWin) {
		LTweenLite.to(s.blockLayer, 0.2, {
			x : -LGlobal.width,
			onComplete : function () {
				s.blockLayer.remove();
			}
		});
	}

	LTweenLite.to(s.hpLayer, 0.2, {
		alpha : 0,
		onComplete : function () {
			s.hpLayer.remove();
		}
	});

	LTweenLite.to(s.timeTxt, 2, {
		y : 130,
		size : 45,
		ease : LEasing.Elastic.easeIn,
		onComplete : function () {
			var lineColor = "#54D9EF";

			if (!isWin) {
				lineColor = "#F92672";
			}

			s.timeTxt.lineColor = lineColor;
			s.timeTxt.lineWidth = 5;
			s.timeTxt.stroke = true;
			s.timeTxt.color = "white";

			if (!isWin) {
				s.timeTxt.text = lang.YOU_LOSE;
			}

			s.addGameOverBtns(isWin);
		}
	});
};

GameLayer.prototype.pause = function (v) {
	var s = this;

	s.pauseBtn.mouseEnabled = false;

	if (v) {
		s.isPause = v;

		LTweenLite.pauseAll();

		LTweenLite.to(s.blockLayer, 0.5, {
			x : -500,
			ease : LEasing.Expo.easeOut,
			onComplete : function () {
				s.blockLayer.visible = false;

				s.pauseBtn.mouseEnabled = true;
			}
		});

		s.pauseMenuLayer.visible = true;

		LTweenLite.to(s.pauseMenuLayer, 0.5, {
			x : 0,
			ease : LEasing.Expo.easeOut
		});
	} else {
		LTweenLite.resumeAll();

		s.blockLayer.visible = true;

		LTweenLite.to(s.blockLayer, 0.5, {
			x : s.blockLayer.originalX,
			ease : LEasing.Expo.easeOut,
			onComplete : function () {
				s.isPause = v;

				s.pauseBtn.mouseEnabled = true;
			}
		});

		LTweenLite.to(s.pauseMenuLayer, 0.5, {
			x : s.pauseMenuLayer.originalX,
			ease : LEasing.Expo.easeOut,
			onComplete : function () {
				s.pauseMenuLayer.visible = false;
			}
		});
	}
};

GameLayer.prototype.addGameOverBtns = function (isWin) {
	var s = this, m = isWin ? 190 : 260;

	var backBtn = new BitmapSprite("back_icon");
	backBtn.x = 130;
	backBtn.y = isWin ? 230 : 280;
	s.addChild(backBtn);

	backBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.remove();

		var beginningLayer = addBeginningLayer();
		beginningLayer.gotoLevelLayer();
	});

	var replayBtn = new BitmapSprite("replay_icon");
	replayBtn.x = backBtn.x;
	replayBtn.y = backBtn.y + m;
	s.overLayer.addChild(replayBtn);

	replayBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.remove();

		startLevel(s.level);
	});

	if (isWin) {
		var shareBtn = new BitmapSprite("share_icon");
		shareBtn.x = backBtn.x;
		shareBtn.y = replayBtn.y + m;
		s.overLayer.addChild(shareBtn);

		shareBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
			alert("mending...");

			return;

			s.remove();

			shareGrade(s.level + 1, s.time);
		});
	}
};
