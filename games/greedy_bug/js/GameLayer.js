function GameLayer (
	backBitmapData,
	bugBitmapDataList,
	bloodBitmapData,
	foodBitmapDataList,
	blockBitmapDataList,
	lightShadowBitmapData,
	clearBtnBgBitmapData,
	clearBtnIconBitmapData,
	pauseBtnBgBitmapData,
	resultBoxBgBitmapData,
	replayBtnBgBitmapData,
	backBtnBgBitmapData
) {
	var s = this;
	LExtends(s, LSprite, []);

	s.point = 0;

	s.isPause = false;

	s.pathLayer = null;
	s.foodLayer = null;
	s.bugLayer = null;
	s.blockArrayLayer = null;
	s.overLayer = null;

	s.back = null;
	s.bug = null;
	s.blockArray = null;
	s.pauseButton = null;
	s.clearButton = null;
	s.pointText = null;

	s.foodBitmapDataList = foodBitmapDataList;
	s.resultBoxBgBitmapData = resultBoxBgBitmapData;
	s.replayBtnBgBitmapData = replayBtnBgBitmapData;
	s.backBtnBgBitmapData = backBtnBgBitmapData;

	s.mouseDownPos = null;
	s.mouseMovePrePos = null;
	s.mouseMoveDirection =  null;
	s.isMouseDown = false;

	s.addBack(backBitmapData);
	s.addLayers();
	s.addPauseButton(pauseBtnBgBitmapData);
	s.addClearButton(clearBtnBgBitmapData, clearBtnIconBitmapData);
	s.addPointText();
	s.addBug(bugBitmapDataList, bloodBitmapData, lightShadowBitmapData);
	s.addBlockArray(blockBitmapDataList);
	s.addEvent();
}
GameLayer.prototype.addBack = function (backBitmapData) {
	var s = this;

	s.back = new LBitmap(backBitmapData);
	s.addChild(s.back);
};
GameLayer.prototype.addLayers = function () {
	var s = this;

	s.pathLayer = new LShape();
	s.addChild(s.pathLayer);

	s.foodLayer = new LSprite();
	s.addChild(s.foodLayer);

	s.bugLayer = new LSprite();
	s.addChild(s.bugLayer);

	s.blockArrayLayer = new LSprite();
	s.addChild(s.blockArrayLayer);

	s.overLayer = new LSprite();
	s.addChild(s.overLayer);
};
GameLayer.prototype.addPauseButton = function (pauseBtnBgBitmapData) {
	var s = this,
	margin = 20,
	btnBgBitmap = new LBitmap(pauseBtnBgBitmapData),
	r = btnBgBitmap.getWidth() / 2,
	btnLabel = new Txt("Pause", 15, "white", "bold");

	btnLabel.stroke = true;
	btnLabel.lineWidth = 3;
	btnLabel.lineColor = "#1188FF";
	btnLabel.heightMode = LTextField.HEIGHT_MODE_BASELINE;

	s.pauseButton = new Button(btnBgBitmap, btnLabel, "#0088FF");
	s.pauseButton.x = s.getWidth() - s.pauseButton.getWidth() - margin;
	s.pauseButton.y = margin;
	s.pauseButton.addShape(LShape.ARC, [r, r, r]);
	s.overLayer.addChild(s.pauseButton);
	s.pauseButton.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
		var obj = e.currentTarget;
		if (obj.parent.parent) {
			var pp = obj.parent.parent;
			pp.isPause = !pp.isPause;

			if (pp.isPause) {
				var cloneLabel = obj.label.clone();
				cloneLabel.text = "Play";
				obj.setLabel(cloneLabel);
			} else {
				var cloneLabel = obj.label.clone();
				cloneLabel.text = "Pause";
				obj.setLabel(cloneLabel);
			}
		}
	});
};
GameLayer.prototype.addClearButton = function (clearBtnBgBitmapData, clearBtnIconBitmapData) {
	var s = this, margin = 20;

	s.clearButton = new ClearButton(clearBtnBgBitmapData, clearBtnIconBitmapData);
	s.clearButton.x = margin;
	s.clearButton.y = s.getHeight() - s.clearButton.getHeight() - margin;
	s.overLayer.addChild(s.clearButton);
};
GameLayer.prototype.addPointText = function () {
	var s = this, margin = 20;

	s.pointText = new Txt("Point: " + s.point, 20, "white", "bold");
	s.pointText.x = margin;
	s.pointText.y = margin;
	s.pointText.heightMode = LTextField.HEIGHT_MODE_BASELINE;
	s.pointText.lineWidth = 5;
	s.pointText.lineColor = "#1188FF";
	s.pointText.stroke = true;
	s.overLayer.addChild(s.pointText);
};
GameLayer.prototype.addBug = function (bugBitmapDataList, bloodBitmapData, lightShadowBitmapData) {
	var s = this;

	s.bug = new Bug(bugBitmapDataList, bloodBitmapData, lightShadowBitmapData);
	s.bug.x = s.getWidth() / 2;
	s.bug.y = s.getHeight() + 20;
	s.bugLayer.addChild(s.bug);
};
GameLayer.prototype.addBlockArray = function (blockBitmapDataList) {
	var s = this;

	s.blockArray = new BlockArray(blockBitmapDataList);
	s.blockArrayLayer.addChild(s.blockArray);
};
GameLayer.prototype.addEvent = function () {
	var s = this;

	s.addEventListener(LMouseEvent.MOUSE_DOWN, s.onMouseDown);
	s.addEventListener(LMouseEvent.MOUSE_UP, s.onMouseUp);
	s.addEventListener(LMouseEvent.MOUSE_MOVE, s.onMouseMove);

	s.addEventListener(LEvent.ENTER_FRAME, s.loop);

	LGlobal.stage.addEventListener(LKeyboardEvent.KEY_DOWN, function (e) {
		s.onKeyDown(e);
	});
};
GameLayer.prototype.onMouseDown = function (e) {
	var s = e.currentTarget;

	if (s.isPointInClearButton(e.selfX, e.selfY) || s.isPointInPauseButton(e.selfX, e.selfY)) {
		return;
	}

	s.mouseDownPos = {x : e.selfX, y : e.selfY};
	s.isMouseDown = true;
};
GameLayer.prototype.onMouseUp = function (e) {
	var s = e.currentTarget;

	if (s.isPointInClearButton(e.selfX, e.selfY) || s.isPointInPauseButton(e.selfX, e.selfY)) {
		s.stopSlideOperation();
		return;
	}

	if (s.bug && s.mouseMoveDirection != null && !s.isPause) {
		s.bug.changeDirection(s.mouseMoveDirection);
	}

	s.stopSlideOperation();
};
GameLayer.prototype.onMouseMove = function (e) {
	var s = e.currentTarget;

	if (s.isPointInClearButton(e.selfX, e.selfY) || s.isPointInPauseButton(e.selfX, e.selfY)) {
		s.stopSlideOperation();
		return;
	}
	
	if (s.isMouseDown) {
		if (!s.mouseMoveDirection) {
			s.mouseMoveDirection = s.getMouseMoveDirection(e, s.mouseDownPos);
		} else {
			currentMoveDirection = s.getMouseMoveDirection(e, s.mouseMovePrePos);
			if (currentMoveDirection != s.mouseMoveDirection) {
				s.stopSlideOperation();
				s.onMouseDown(e);
			}
		}

		s.mouseMovePrePos = {x : e.selfX, y : e.selfY};
	}
};
GameLayer.prototype.isPointInClearButton = function (x, y) {
	return this.clearButton && this.clearButton.hitTestPoint(x, y);
};
GameLayer.prototype.isPointInPauseButton = function (x, y) {
	return this.pauseButton && this.pauseButton.hitTestPoint(x, y);
};
GameLayer.prototype.getMouseMoveDirection = function (curPos, prePos) {
	var s = this;

	var i = Math.abs((curPos.selfX - prePos.x) / (curPos.selfY - prePos.y));

	if (i >= 1 && curPos.selfX >= prePos.x) {
		return Bug.DIRECTION_RIGHT;
	} else if (i > 1 && curPos.selfX < prePos.x) {
		return Bug.DIRECTION_LEFT;
	} else if (i <= 1 && curPos.selfY >= prePos.y) {
		return Bug.DIRECTION_DOWN;
	} else if (i < 1 && curPos.selfY < prePos.y) {
		return Bug.DIRECTION_UP;
	}
};
GameLayer.prototype.stopSlideOperation = function () {
	var s = this;

	s.mouseDownPos = null;
	s.mouseMovePrePos = null;
	s.mouseMoveDirection =  null;
	s.isMouseDown = false;
};
GameLayer.prototype.loop = function (e) {
	var s = e.currentTarget;

	if (s.isPause) {
		return;
	}

	s.bug.move();

	s.blockArray.loop();

	s.isFoodHitBug();

	s.updatePointText();

	s.isAnyBtnCoverSth(s.pauseButton);

	s.isAnyBtnCoverSth(s.clearButton);

	s.isPointTextCoverSth();

	s.clearButton.restore();
};
GameLayer.prototype.addFood = function () {
	var s = this;

	if (s.foodLayer.childList.length > 0) {
		return;
	}

	var getFoodRandomPosition = function (bitmapData) {
		var x = (20 + (s.getWidth() - item.width - 40) * Math.random())  >> 0,
		y = (20 + (s.getHeight() - item.height - 40) * Math.random())  >> 0,
		w = item.width,
		h = item.height;

		if (s.blockArray.hitFoodTest(null, {
			width : bitmapData.width,
			height : bitmapData.height,
			x : x,
			y : y
		})) {
			return getFoodRandomPosition(bitmapData);
		}

		return {x : x, y : y};
	};

	var list = s.foodBitmapDataList,
	item = list[(list.length * Math.random()) >> 0],
	pos = getFoodRandomPosition(item);

	var foodObj = new Food(item, pos.x, pos.y);
	s.foodLayer.addChild(foodObj);
};
GameLayer.prototype.isFoodHitBug = function () {
	var s = this;

	var foodObj = s.foodLayer.getChildAt(0);
	if (foodObj) {
		if (!foodObj.isBeEaten && s.bug.isAlive && foodObj.hitTestObject(s.bug)) {
			foodObj.destroy(
				function () {
					s.point++;
				},
				function () {
					s.addFood();
				}
			);
		}
	}
};
GameLayer.prototype.updatePointText = function () {
	this.pointText.text = "Point: " + this.point;
};
GameLayer.prototype.isAnyBtnCoverSth = function (button) {
	var s = this;

	if (!button) {
		return;
	}

	var foodObj = s.foodLayer.getChildAt(0);
	if (foodObj && button.hitTestObject(foodObj)) {
		button.alpha = 0.4;
		return;
	}

	if (s.bug && button.hitTestObject(s.bug)) {
		button.alpha = 0.4;
		return;
	}

	if (s.blockArray && s.blockArray.blockLayer.visible && s.blockArray.blockLayer.childList.length > 0) {
		for (var k = 0, l = s.blockArray.blockLayer.childList.length; k < l; k++) {
			var block = s.blockArray.blockLayer.childList[k];

			if (button.hitTestObject(block)) {
				button.alpha = 0.4;
				return;
			}
		}
	}

	button.alpha = 1;
};
GameLayer.prototype.isPointTextCoverSth = function () {
	var s = this, tcx, tcy, fcx, fcy, bcx, bcy;

	if (!s.pointText) {
		return;
	}

	var tcx = s.pointText.x + s.pointText.getWidth() / 2,
	tcy = s.pointText.y + s.pointText.getHeight() / 2;

	var foodObj = s.foodLayer.getChildAt(0);
	
	if (foodObj) {
		fcx = foodObj.x + foodObj.getWidth() / 2,
		fcy = foodObj.y + foodObj.getHeight() / 2;

		if (
			(Math.abs(tcx - fcx) <= (s.pointText.getWidth() + foodObj.width) / 2)
			&&
			(Math.abs(tcy - fcy) <= (s.pointText.getHeight() + foodObj.height) / 2)
		) {
			s.pointText.alpha = 0.4;
			return;
		}
	}

	if (s.bug) {
		bcx = s.bug.x,
		bcy = s.bug.y;

		if (
			(Math.abs(tcx - bcx) <= (s.pointText.getWidth() + s.bug.width) / 2)
			&&
			(Math.abs(tcy - bcy) <= (s.pointText.getHeight() + s.bug.height) / 2)
		) {
			s.pointText.alpha = 0.4;
			return;
		}
	}

	s.pointText.alpha = 1;
};
GameLayer.prototype.onKeyDown = function (e) {
	var s = this;

	if (s.bug && !s.isPause) {
		switch (e.keyCode) {
			case 38 :
				s.bug.changeDirection(Bug.DIRECTION_UP);
				break;
			case 40 :
				s.bug.changeDirection(Bug.DIRECTION_DOWN);
				break;
			case 37 :
				s.bug.changeDirection(Bug.DIRECTION_LEFT);
				break;
			case 39 :
				s.bug.changeDirection(Bug.DIRECTION_RIGHT);
				break;
			case 32 :
				if (s.clearButton && s.clearButton.mouseEnabled) {
					s.clearButton.clearPath();
				}
				break;
		}
	}
};
GameLayer.prototype.gameOver = function () {
	var s = this;

	LTweenLite.removeAll();

	s.removeAllEventListener();

	LGlobal.stage.removeEventListener(LKeyboardEvent.KEY_DOWN, function (e) {
		s.onKeyDown(e);
	});

	var resultBox = new ResultBox(s.point, s.resultBoxBgBitmapData, s.replayBtnBgBitmapData, s.backBtnBgBitmapData);
	resultBox.x = (s.getWidth() - resultBox.getWidth()) * 0.5;
	resultBox.y = (s.getHeight() - resultBox.getHeight()) * 0.5;
	s.overLayer.addChild(resultBox);
};
GameLayer.prototype.destroy = function (onDestroy) {
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