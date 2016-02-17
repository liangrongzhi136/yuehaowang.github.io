LInit(50, "mydemo", 800, 600, loadRes);

var stageLayer, selectedColorBox = null, partList = null;

function loadRes () {
	var loadList = [
		{path : "./Robot.js"},
		{path : "./Part.js"},
		{path : "./Body.js"},
		{path : "./Head.js"},
		{path : "./Limb.js"},
		{path : "./ColorBox.js"}
	];

	var loadingTxt = new LTextField();
	loadingTxt.text = "Loading...";
	addChild(loadingTxt);

	LLoadManage.load(loadList, null, function () {
		loadingTxt.remove();

		initStageLayer();
		addRobot();
		addColors();
	});
}

function initStageLayer () {
	stageLayer = new LSprite();
	stageLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height]);
	addChild(stageLayer);

	stageLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function () {
		if (selectedColorBox) {
			selectedColorBox.x = mouseX;
			selectedColorBox.y = mouseY;
		}
	});

	stageLayer.addEventListener(LMouseEvent.MOUSE_UP, function () {
		if (selectedColorBox) {
			if (partList) {
				for (var i = 0, l = partList.length; i < l; i++) {
					var o = partList[i], p = o.part, e = o.exec;

					if (isPartHitObject(p, selectedColorBox)) {
						setPartAlpha(p, 1);
						e.fillColor = selectedColorBox.color;
						e.draw();
					}
				}
			}

			selectedColorBox.remove();

			selectedColorBox = null;
		}
	});

	stageLayer.addEventListener(LEvent.ENTER_FRAME, loop);
}

function loop () {
	if (partList && selectedColorBox) {
		for (var i = 0, l = partList.length; i < l; i++) {
			var p = partList[i].part;

			if (isPartHitObject(p, selectedColorBox)) {
				setPartAlpha(p, 0.5);
			} else {
				setPartAlpha(p, 1);
			}
		}
	}
}

function isPartHitObject (list, obj) {
	for (var i = 0, l = list.length; i < l; i++) {
		if (list[i].hitTestObject(obj)) {
			return true;
		}
	}

	return false;
}

function setPartAlpha (list, a) {
	for (var i = 0, l = list.length; i < l; i++) {
		list[i].alpha = a;
	}
}

function addRobot () {
	var robot = new Robot();
	robot.x = (LGlobal.width - robot.getWidth()) / 2;
	robot.y = 220;
	stageLayer.addChild(robot);
}

function addColors () {
	var colorList = [
		"orange",
		"red",
		"yellow",
		"green",
		"blue",
		"lightblue",
		"purple",
		"brown",
		"lightgreen",
		"orangered"
	];
	var r = (LGlobal.height - 80) / 2;

	var layer = new LSprite();
	layer.x = LGlobal.width / 2;
	layer.y = LGlobal.height / 2;
	stageLayer.addChild(layer);

	for (var i = 0, l = colorList.length; i < l; i++) {
		var angle = 2 * i * Math.PI / l;

		var colorBox = new ColorBox(colorList[i]);
		colorBox.x = r * Math.cos(angle);
		colorBox.y = r * Math.sin(angle);
		layer.addChild(colorBox);

		colorBox.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
			selectedColorBox = e.currentTarget.clone();
			selectedColorBox.x = e.offsetX;
			selectedColorBox.y = e.offsetY;
			stageLayer.addChild(selectedColorBox);
		});
	}
}