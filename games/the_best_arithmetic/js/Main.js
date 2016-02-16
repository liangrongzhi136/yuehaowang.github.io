/**
 * It's a game about math.
 */

LInit(1000 / 40, "mygame", 500, 925, main);

var dataList = {};
var stageLayer;
var gameLanguage;

function main () {
	LGlobal.setDebug(false);

	fullScreen();

	LGlobal.stage.addEventListener(LEvent.WINDOW_RESIZE, fullScreen);

	loadLanguageFile(loadRes);
	setMouseContainer(true);
}

function loadLanguageFile (onComplete) {
	var url, lang = navigator.language;

	if (lang && lang.indexOf("zh") > -1) {
		url = "./lang/chs.js";

		gameLanguage = "chs";
	} else {
		url = "./lang/en.js";

		gameLanguage = "en";
	}

	var urlLoader = new LURLLoader();
	urlLoader.load(url);
	urlLoader.addEventListener(LEvent.COMPLETE, onComplete);
}

function setMouseContainer (v) {
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN, v);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP, v);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE, v);
}

function fullScreen () {
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	LGlobal.screen(LGlobal.FULL_SCREEN);
}

function loadRes () {
	var loadData = [
		{path : "./lib/lufylegend.ui-0.14.0.min.js"},
		{path : "./lib/LListView-0.1.1.js"},

		{path : "./data/levelData.js"},
		{path : "./data/helpData.js"},

		{path : "./js/BeginningLayer.js"},
		{path : "./js/Time.js"},
		{path : "./js/ArtNumber.js"},
		{path : "./js/Fraction.js"},
		{path : "./js/GameLayer.js"},
		{path : "./js/PauseButton.js"},
		{path : "./js/BitmapSprite.js"},
		{path : "./js/MultipageView.js"},
		{path : "./js/HpLayer.js"},
		{path : "./js/ShareLayer.js"},
		{path : "./js/RankingListChildView.js"},
		
		{name : "bg", path : "./images/bg.png"},
		{name : "help1", path : "./images/help1.png"},
		{name : "help2", path : "./images/help2.png"},
		{name : "help3", path : "./images/help3.png"},
		{name : "start_icon", path : "./images/start_icon.png"},
		{name : "help_icon", path : "./images/help_icon.png"},
		{name : "formula_icon", path : "./images/formula_icon.png"},
		{name : "flag_red_icon", path : "./images/flag_red_icon.png"},
		{name : "flag_green_icon", path : "./images/flag_green_icon.png"},
		{name : "replay_icon", path : "./images/replay_icon.png"},
		{name : "back_icon", path : "./images/back_icon.png"},
		{name : "share_icon", path : "./images/share_icon.png"},
		{name : "heart_icon", path : "./images/heart_icon.png"},
		{name : "medal_gold_icon", path : "./images/medal_gold_icon.png"},
		{name : "medal_silver_icon", path : "./images/medal_silver_icon.png"},
		{name : "medal_bronze_icon", path : "./images/medal_bronze_icon.png"},
		{name : "yuehao_logo", path : "./images/yuehao_logo.png"}
	];

	var loadingBar = new LoadingSample5();
	addChild(loadingBar);

	LLoadManage.load(
		loadData,
		function (p) {
			loadingBar.setProgress(p);
		},
		function (r) {
			dataList = r;

			loadingBar.remove();

			gameInit();
		}
	);
}

function gameInit () {
	var bg = new LBitmap(new LBitmapData(dataList["bg"]));
	bg.scaleX = LGlobal.width / bg.getWidth();
	bg.scaleY = LGlobal.height / bg.getHeight();
	addChild(bg);

	stageLayer = new LSprite();
	addChild(stageLayer);

	var m = new LShape();
	m.graphics.drawRect(0, "", [33, 54, LGlobal.width - 70, LGlobal.height - 108]);

	stageLayer.mask = m;
	addBeginningLayer();
}

function addBeginningLayer () {
	var beginningLayer = new BeginningLayer();
	stageLayer.addChild(beginningLayer);
	
	return beginningLayer;
}

function startLevel (level) {
	var gameLayer = new GameLayer(level);
	stageLayer.addChild(gameLayer);
}

function shareGrade (level, time) {
	var shareLayer = new ShareLayer(level, time);
	stageLayer.addChild(shareLayer);
}

function wordWrap (txt, t) {
	var txtList = txt.split(" "), w = t.w, resultList = new Array(), result = "";
	
	if (gameLanguage == "chs") {
		result = txt;

		t.width = w;
	} else {
		for (var i = 0, l = txtList.length; i < l; i++) {
			var c = txtList[i];

			t.text += c;

			if (t.getWidth() >= w) {
				t.text = "";

				resultList.push("\n");
			} else {
				t.text += " ";
			}

			resultList.push(c);
		}

		for (var j = 0, s = resultList.length; j < s; j++) {
			var item = resultList[j];

			result += item;

			if (item != "\n") {
				result += " ";
			}
		}

		t.width = LGlobal.width;
	}
	
	t.text = result;
	t.setWordWrap(true, 40);
}
