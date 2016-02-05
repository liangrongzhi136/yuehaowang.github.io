(function () {
	LGlobal.aspectRatio = LANDSCAPE;
})();

LInit(1000 / 30, "mylegend", 800, 480, main);

var datalist = {};
function main () {
	LGlobal.setDebug(false);

	document.body.style.margin = "0px";
	document.body.style.padding = "0px";
	document.body.style.backgroundColor = "black";

	var f = function () {
		LGlobal.screen(LGlobal.FULL_SCREEN);

		loadGame();
	};

	if (LGlobal.mobile) {
		var dd = document.documentElement,
		bodyObj = null,
		sh = dd.scrollHeight,
		ch = dd.clientHeight;

		if (sh <= ch) {
			bodyObj = document.getElementsByTagName('body')[0];
			bodyObj.style.height = (ch / screen.width) * screen.height + 'px';
		}

		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;

		setTimeout(function () {
			window.scrollTo(0, 1);
			
			f();
		}, 100);
	} else {
		f();
	}
}
function loadGame () {
	var loadData = [
		[
			{path : "./js/Txt.js"},
			{path : "./js/VBoxLayout.js"},
			{path : "./js/LoadingLayer.js"},
			{path : "./js/SoundManager.js"},

			{name : "logo", path : "./images/logo.png"},
			{name : "bg", path : "./images/bg.png"}
		],
		[
			{path : "./lib/LRadio-0.1.0.js"},
			{path : "./js/HBoxLayout.js"},
			{path : "./js/Button.js"},
			{path : "./js/RadioBox.js"},
			{path : "./js/OpeningLayer.js"},
			{path : "./js/HelpLayer.js"},
			{path : "./js/ShareLayer.js"},
			{path : "./js/SettingsLayer.js"},
			{path : "./js/AboutLayer.js"},
			{path : "./js/Bug.js"},
			{path : "./js/Food.js"},
			{path : "./js/BlockArray.js"},
			{path : "./js/ClearButton.js"},
			{path : "./js/ResultBox.js"},
			{path : "./js/GameLayer.js"},

			{name : "bug_frame0", path : "./images/bug_frame0.png"},
			{name : "bug_frame1", path : "./images/bug_frame1.png"},
			{name : "blood", path : "./images/blood.png"},
			{name : "btn_bg0", path : "./images/btn_bg0.png"},
			{name : "btn_bg1", path : "./images/btn_bg1.png"},
			{name : "btn_bg2", path : "./images/btn_bg2.png"},
			{name : "btn_bg3", path : "./images/btn_bg3.png"},
			{name : "btn_up", path : "./images/btn_up.png"},
			{name : "btn_down", path : "./images/btn_down.png"},
			{name : "btn_left", path : "./images/btn_left.png"},
			{name : "btn_right", path : "./images/btn_right.png"},
			{name : "btn_settings", path : "./images/btn_settings.png"},
			{name : "btn_about", path : "./images/btn_about.png"},
			{name : "btn_share_twitter", path : "./images/btn_share_twitter.png"},
			{name : "btn_share_facebook", path : "./images/btn_share_facebook.png"},
			{name : "food0", path : "./images/food0.png"},
			{name : "food1", path : "./images/food1.png"},
			{name : "food2", path : "./images/food2.png"},
			{name : "food3", path : "./images/food3.png"},
			{name : "food4", path : "./images/food4.png"},
			{name : "food5", path : "./images/food5.png"},
			{name : "food6", path : "./images/food6.png"},
			{name : "food7", path : "./images/food7.png"},
			{name : "food8", path : "./images/food8.png"},
			{name : "food9", path : "./images/food9.png"},
			{name : "food10", path : "./images/food10.png"},
			{name : "block0", path : "./images/block0.png"},
			{name : "block1", path : "./images/block1.png"},
			{name : "block2", path : "./images/block2.png"},
			{name : "block3", path : "./images/block3.png"},
			{name : "light_shadow", path : "./images/light_shadow.png"},
			{name : "result_box_bg", path : "./images/result_box_bg.png"},
			{name : "clear", path : "./images/clear.png"}
		]
	];
	LLoadManage.load(
		loadData[0],
		null,
		function (r) {
			updateDatalist(r);

			var loadingInterface = new LoadingLayer(datalist["bg"], datalist["logo"]);
			addChild(loadingInterface);

			if (SoundManager.isPreloadSound()) {
				for (var k = 0, l = SoundManager.LOAD_LIST.length; k < l; k++) {
					loadData[1].push(SoundManager.LOAD_LIST[k]);
				}
			}

			LLoadManage.load(
				loadData[1],
				function (p) {
					loadingInterface.setProgress(p);
				},
				function (r) {
					updateDatalist(r);

					if (LGlobal.mobile) {
						SettingsLayer.MUSIC = 1;
					}

					var musicList = null;
					if (SoundManager.isPreloadSound()) {
						musicList = {bg_music : datalist["bg_music"]};
					}
					SoundManager.init(musicList);

					var backBitmapData = loadingInterface.back.bitmapData,
					contentLayerX = loadingInterface.contentLayer.x,
					contentLayerY = loadingInterface.contentLayer.y,
					logoBitmapData = loadingInterface.logo.bitmapData;

					loadingInterface.destroy(function () {
						addOpeningInterface(
							backBitmapData,
							contentLayerX,
							contentLayerY,
							logoBitmapData
						);
					});
				}
			);
		}
	);
}
function updateDatalist (r) {
	for (var k in r) {
		var o = r[k];
		if (o instanceof Image) {
			datalist[k] = new LBitmapData(o);
		} else {
			datalist[k] = o;
		}
	}
}
function addOpeningInterface (backBitmapData, contentLayerX, contentLayerY, logoBitmapData) {
	var openingInterface = new OpeningLayer(
		backBitmapData,
		contentLayerX,
		contentLayerY,
		logoBitmapData,
		[
			datalist["btn_bg0"],
			datalist["btn_bg1"],
			datalist["btn_bg2"]
		],
		[
			datalist["btn_settings"],
			datalist["btn_about"]
		]
	);
	addChild(openingInterface);
}
function addGameInterface (backBitmapData) {
	var foodBitmapDataList = [
		datalist["food0"],
		datalist["food1"],
		datalist["food2"],
		datalist["food3"],
		datalist["food4"],
		datalist["food5"],
		datalist["food6"],
		datalist["food7"],
		datalist["food8"],
		datalist["food9"],
		datalist["food10"]
	];
	var bugBitmapDataList = [
		datalist["bug_frame0"],
		datalist["bug_frame1"]
	];
	var blockBitmapDataList = [
		datalist["block0"],
		datalist["block1"],
		datalist["block2"],
		datalist["block3"]
	];
	var gameInterface = new GameLayer(
		backBitmapData,
		bugBitmapDataList,
		datalist["blood"],
		foodBitmapDataList,
		blockBitmapDataList,
		datalist["light_shadow"],
		datalist["btn_bg3"],
		datalist["clear"],
		datalist["btn_bg1"],
		datalist["result_box_bg"],
		datalist["btn_bg3"],
		datalist["btn_bg1"]
	);
	addChild(gameInterface);
}
function addHelpInterface (backBitmapData) {
	var helpInterface = new HelpLayer(
		backBitmapData,
		[
			datalist["btn_up"],
			datalist["btn_left"],
			datalist["btn_down"],
			datalist["btn_right"]
		],
		datalist["btn_bg1"]
	);
	addChild(helpInterface);
}
function addShareInterface (backBitmapData) {
	var shareInterface = new ShareLayer(
		backBitmapData,
		datalist["btn_bg1"],
		[
			datalist["btn_share_twitter"],
			datalist["btn_share_facebook"]
		]
	);
	addChild(shareInterface);
}
function addSettingsInterface (backBitmapData) {
	var settingsInterface = new SettingsLayer(backBitmapData, datalist["btn_bg1"]);
	addChild(settingsInterface);
}
function addAboutInterface (backBitmapData) {
	var aboutInterface = new AboutLayer(backBitmapData, datalist["btn_bg1"]);
	addChild(aboutInterface);
}