window.onload = function () {
	var w, h;

	if (LGlobal.mobile) {
		h = 736;
		w = h * window.innerWidth / window.innerHeight;

		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	} else {
		w = 414;
		h = 736;
	}

	LGlobal.aspectRatio = PORTRAIT;

	LInit(1000 / 60, "mygame", w, h, main);
};

var dataList = {};
var stageLayer;

function main () {
	LGlobal.screen(LGlobal.FULL_SCREEN);

	loadRes();
}

function loadRes () {
	var loadData = [
		{path : "./js/RoundButton.js"},
		{path : "./js/BeginningLayer.js"},
		{path : "./js/GameLayer.js"},
		{path : "./js/PauseButton.js"},
		{path : "./js/Runner.js"},
		{path : "./js/Bird.js"},
		{path : "./js/Stone.js"},
		{path : "./js/Explosion.js"},

		{name : "bg", path : "./images/bg.png"},
		{name : "btn_pause_sheet", path : "./images/btn_pause_sheet.png"},
		{name : "logo", path : "./images/logo.png"},
		{name : "bird1", path : "./images/bird1.png"},
		{name : "bird2", path : "./images/bird2.png"},
		{name : "bird3", path : "./images/bird3.png"},
		{name : "stone", path : "./images/stone.png"},
		{name : "explosion", path : "./images/explosion.png"}
	];

	var loadingBar = new SinLoadingBar();
	addChild(loadingBar);

	LLoadManage.load(
		loadData,
		function (p) {
			loadingBar.setProgress(p);
		},
		function (res) {
			dataList = res;

			var timer = new LTimer(800, 1);
			timer.addEventListener(LTimerEvent.TIMER_COMPLETE, function () {
				loadingBar.remove();

				stageLayer = new LSprite();
				addChild(stageLayer);

				// var fps = new FPS();
				// addChild(fps);

				addBeginningLayer();
			});
			timer.start();
		}
	);
}

function addBeginningLayer () {
	var beginnningLayer = new BeginningLayer();
	stageLayer.addChild(beginnningLayer);
}

function startGame () {
	var gameLayer = new GameLayer();
	stageLayer.addChild(gameLayer);
}