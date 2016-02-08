LInit(30, "mydemo", 700, 480, main);

// 移动方向，null代表没移动
var direction = null;
// 小鸟，舞台层，背景对象
var bird, stageLayer, bg;
// 每次移动的长度
var step = 5;

function main () {
	// 资源列表
	var loadList = [
		{name : "bird", path : "./bird.png"},
		{name : "bg", path : "./bg.jpg"}
	];
	// 加载资源
	LLoadManage.load(loadList, null, demoInit);
}

function demoInit (result) {
	// 初始化舞台层
	stageLayer = new LSprite();
	addChild(stageLayer);

	// 加入背景
	bg = new LBitmap(new LBitmapData(result["bg"]));
	bg.y = -100;
	stageLayer.addChild(bg);

	// 加入小鸟
	bird = new LBitmap(new LBitmapData(result["bird"]));
	bird.x = 100;
	bird.y = 150;
	stageLayer.addChild(bird);

	// 添加鼠标按下事件
	stageLayer.addEventListener(LMouseEvent.MOUSE_DOWN, onDown);
	// 添加鼠标弹起事件
	stageLayer.addEventListener(LMouseEvent.MOUSE_UP, onUp);
	// 添加时间轴事件
	stageLayer.addEventListener(LEvent.ENTER_FRAME, onFrame);
}

function onDown (e) {
	/** 根据点击位置设置移动方向 */ 
	if (e.offsetX > LGlobal.width / 2) {
		direction = "right";
	} else {
		direction = "left";
	}
}

function onUp () {
	// 设置方向为无方向，代表不移动
	direction = null;
}

function onFrame () {
	var _step, minX, maxX;

	/** 移动小鸟 */
	if (direction == "right") {
		_step = step;
	} else if (direction == "left") {
		_step = -step;
	} else {
		return;
	}

	bird.x += _step;

	/** 控制小鸟移动范围 */
	minX = 0,
	maxX = bg.getWidth() - bird.getWidth();

	if (bird.x < minX) {
		bird.x = minX;
	}else if (bird.x > maxX) {
		bird.x = maxX;
	}

	/** 移动舞台 */
	stageLayer.x = LGlobal.width / 2 - bird.x;

	/** 控制舞台移动范围 */
	minX = LGlobal.width - stageLayer.getWidth(),
	maxX = 0;

	if (stageLayer.x < minX) {
		stageLayer.x = minX;
	}else if (stageLayer.x > maxX) {
		stageLayer.x = maxX;
	}
}