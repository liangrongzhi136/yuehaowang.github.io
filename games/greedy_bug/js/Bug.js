function Bug (bugBitmapDataList, bloodBitmapData, lightShadowBitmapData) {
	var s = this;
	LExtends(s, LSprite, []);

	s.bitmap = null;

	s.direction = Bug.DIRECTION_UP;
	s.preDirection = null;
	s.directionStartPointList = new Array();

	s.stepLength = 5;

	s.bloodBitmapData = bloodBitmapData;
	s.lightShadowBitmapData = lightShadowBitmapData;

	s.frameList = bugBitmapDataList;
	s.currentFrameIndex = 0;

	s.maxAnimationLoopIndex = 2;
	s.animationLoopIndex = 0;

	s.isInitEdge = false;
	s.leftEdge = null;
	s.rightEdge = null;
	s.topEdge = null;
	s.bottomEdge = null;

	s.isAlive = true;

	s.isAppear = false;

	s.routeList = new Array();
	s.drawPath = new Array();

	s.rotateTween = null;

	s.attachBitmap();
	s.addShape(LShape.ARC, [0, 0, (s.getWidth() - 10) / 2]);
}
Bug.DIRECTION_UP = 0;
Bug.DIRECTION_DOWN = 1;
Bug.DIRECTION_LEFT = 2;
Bug.DIRECTION_RIGHT = 3;
Bug.prototype.attachBitmap = function () {
	var s = this;

	s.bitmap = new LBitmap(s.frameList[s.currentFrameIndex]);
	s.bitmap.x = -s.bitmap.getWidth() / 2;
	s.bitmap.y = -s.bitmap.getHeight() / 2;
	s.addChild(s.bitmap);
};
Bug.prototype.move = function () {
	var s = this;

	if (!s.isAlive) {
		return;
	}

	if (s.animationLoopIndex++ >= s.maxAnimationLoopIndex) {
		s.bitmap.bitmapData = s.frameList[s.currentFrameIndex++];
		s.animationLoopIndex = 0;

		if (s.currentFrameIndex >= s.frameList.length) {
			s.currentFrameIndex = 0;
		}
	}

	var prePoint = [s.x, s.y];

	switch (s.direction) {
		case Bug.DIRECTION_UP :
			s.y -= s.stepLength;
			break;
		case Bug.DIRECTION_DOWN :
			s.y += s.stepLength;
			break;
		case Bug.DIRECTION_LEFT :
			s.x -= s.stepLength;
			break;
		case Bug.DIRECTION_RIGHT :
			s.x += s.stepLength;
			break;
	}

	if (!s.isInitEdge) {
		s.initEdge();
	}

	if (s.isAppear) {
		var gameOverFunc = function () {
			if (s.parent && s.parent.parent) {
				var pp = s.parent.parent;

				s.destroy(
					function () {
						pp.pauseButton.mouseEnabled = false;
						pp.clearButton.mouseEnabled = false;
					},
					function () {
						pp.gameOver();
					}
				);
			}
		};
		
		if (s.x < s.leftEdge) {
			s.x = s.leftEdge;
			gameOverFunc();
			return;
		} else if (s.x > s.rightEdge) {
			s.x = s.rightEdge;
			gameOverFunc();
			return;
		}

		if (s.y < s.topEdge) {
			s.y = s.topEdge;
			gameOverFunc();
			return;
		} else if (s.y > s.bottomEdge) {
			s.y = s.bottomEdge;
			gameOverFunc();
			return;
		}

		if (s.parent && s.parent.parent) {
			var blockArray = s.parent.parent.blockArray;
			if (blockArray && blockArray.waitingMode == BlockArray.WAITING_MODE_REMOVE && blockArray.blockLayer.childList.length > 0) {
				for (var k = 0, l = blockArray.blockLayer.childList.length; k < l; k++) {
					var block = blockArray.blockLayer.childList[k];

					if (s.hitTestObject(block)) {
						gameOverFunc();
						return;
					}
				}
			}
		}

		if (s.direction != s.preDirection) {
			s.directionStartPointList.push(prePoint);
			s.preDirection = s.direction;
		}

		var currentPoint = [s.x, s.y],
		isRepeat = s.isPointInRoute(currentPoint);
		
		s.routeList.push(currentPoint);
		s.updateDrawPath(currentPoint);
		
		if (isRepeat) {
			gameOverFunc();
			return;
		}

		s.drawRoute();
	} else {
		if (s.y <= s.bottomEdge - s.stepLength * 10) {
			s.isAppear = true;

			if (s.parent && s.parent.parent) {
				var pp = s.parent.parent;

				pp.addFood();
				pp.clearButton.mouseEnabled = true;
			}
		}
	}
};
Bug.prototype.initEdge = function () {
	var s = this;

	if (!s.parent || !s.parent.parent) {
		return;
	}

	var pp = s.parent.parent;

	s.leftEdge = s.getWidth() / 2;
	s.rightEdge = pp.back.getWidth() - s.getWidth() / 2;
	s.topEdge = s.getHeight() / 2;
	s.bottomEdge = pp.back.getHeight() - s.getHeight() / 2;

	s.isInitEdge = true;
};
Bug.prototype.updateDrawPath = function (point) {
	var s = this, list = s.directionStartPointList;

	if (list.length == 0) {
		return;
	}

	s.drawPath.length = 0;
	for (var k = 0, l = list.length; k < l; k++) {
		s.drawPath.push(list[k]);
	}
	s.drawPath.push(point);
};
Bug.prototype.drawRoute = function () {
	var s = this;

	if (!s.parent || !s.parent.parent || s.drawPath.length <= 1) {
		return;
	}

	var pp = s.parent.parent;

	pp.pathLayer.graphics.clear();
	pp.pathLayer.graphics.add(function () {
		var c = LGlobal.canvas,
		image = s.lightShadowBitmapData.image,
		prePoint = s.drawPath[0];

		var drawImage = function (x, y) {
			var drawX = x - image.width / 2,
			drawY = y - image.height / 2;
			c.drawImage(image, drawX, drawY);
		};

		for (var k = 1, l = s.drawPath.length; k < l; k++) {
			var o = s.drawPath[k], step, x = prePoint[0], y = prePoint[1];
			if (o[1] == prePoint[1]) {
				if (o[0] > prePoint[0]) {
					step = s.stepLength;
					for (; x < o[0]; x += step) {
						drawImage(x, y);
					}
				} else {
					step = -s.stepLength;
					for (; x > o[0]; x += step) {
						drawImage(x, y);
					}
				}
			} else if (o[0] == prePoint[0]) {
				if (o[1] > prePoint[1]) {
					step = s.stepLength;
					for (; y < o[1]; y += step) {
						drawImage(x, y);
					}
				} else {
					step = -s.stepLength;
					for (; y > o[1]; y += step) {
						drawImage(x, y);
					}
				}
			}

			prePoint = o;
		}
	});
	pp.pathLayer.graphics.add(function () {
		var c = LGlobal.canvas;
		c.beginPath();
		c.lineCap = "round";
		c.lineJoin = "round";
		c.moveTo(s.drawPath[0][0], s.drawPath[0][1]);
		for (var i = 1, l = s.drawPath.length; i < l; i++) {
			c.lineTo(s.drawPath[i][0], s.drawPath[i][1]);
		}
		c.lineWidth = 2;
		c.strokeStyle = "orange";
		c.stroke();
		c.lineWidth = 1;
		c.strokeStyle = "white";
		c.stroke();
	});
};
Bug.prototype.changeDirection = function (direction) {
	var s = this, angle = 0;

	if (!s.isAppear || !s.isAlive) {
		return;
	}

	if (s.rotateTween) {
		LTweenLite.remove(s.rotateTween);
	}

	s.direction = direction;

	switch (direction) {
		case Bug.DIRECTION_UP :
			angle = 0;
			break;
		case Bug.DIRECTION_DOWN :
			angle = 180;
			break;
		case Bug.DIRECTION_LEFT :
			angle = -90;
			break;
		case Bug.DIRECTION_RIGHT :
			angle = 90;
			break;
	}

	s.rotateTween = LTweenLite.to(s, 0.1, {
		rotate : angle,
		onComplete : function (obj) {
			obj.rotateTween = null;
		}
	});
};
Bug.prototype.isPointInRoute = function (point) {
	var s = this;

	if (s.routeList.length > 0) {
		for (var i = 0, l = s.routeList.length; i < l; i++) {
			var o = s.routeList[i];
			if (o[0] == point[0] && o[1] == point[1]) {
				return true;
			}
		}
	}
	return false;
};
Bug.prototype.clearPath = function () {
	var s = this;

	if (!s.parent || !s.parent.parent) {
		return;
	}

	s.parent.parent.pathLayer.graphics.clear();
	s.routeList.length = 0;
	s.drawPath.length = 0;
	s.preDirection = null;
	s.directionStartPointList.length = 0;
};
Bug.prototype.destroy = function (beforeDestroy, onDestroy) {
	var s = this;

	s.isAlive = false;

	beforeDestroy();

	if (s.rotateTween) {
		LTweenLite.remove(s.rotateTween);
	}

	var bloodBitmap = new LBitmap(s.bloodBitmapData);
	bloodBitmap.rotate = -s.rotate;
	bloodBitmap.x = -bloodBitmap.getWidth() / 2;
	bloodBitmap.y = -bloodBitmap.getHeight() / 2;
	s.addChild(bloodBitmap);

	LTweenLite.to(s, 0.8, {
		alpha : 0,
		onComplete : function (obj) {
			onDestroy();
			obj.remove();
		}
	})
};