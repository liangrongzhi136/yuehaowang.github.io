function BlockArray (bitmapDataList) {
	var s = this;
	LExtends(s, LSprite, []);

	s.bitmapDataList = bitmapDataList;
	s.frameIndex = 0;
	s.maxFrameIndex = 100;
	s.waitingMode = BlockArray.WAITING_MODE_ADD;
	s.stopLoop = false;

	s.hintLayer = null;
	s.blockLayer = null;

	s.addLayers();
}
BlockArray.WAITING_MODE_ADD = 0;
BlockArray.WAITING_MODE_SHOW = 0.5;
BlockArray.WAITING_MODE_REMOVE = 2.5;
BlockArray.prototype.addLayers = function () {
	var s = this;

	s.hintLayer = new LSprite();
	s.addChild(s.hintLayer);

	s.blockLayer = new LSprite();
	s.blockLayer.alpha = 0.5;
	s.blockLayer.originalAlpha = s.blockLayer.alpha;
	s.addChild(s.blockLayer);
};
BlockArray.prototype.loop = function () {
	var s = this;

	if (!s.stopLoop && s.frameIndex ++ > s.maxFrameIndex * (s.waitingMode + 1)) {
		s.frameIndex = 0;

		if (s.waitingMode == BlockArray.WAITING_MODE_ADD) {
			s.addBlocks(Math.round(Math.random() * 8) + 1);

			s.blockLayer.alpha = 0;
			s.stopLoop = true;

			LTweenLite.to(s.blockLayer, 0.2, {
				alpha : s.blockLayer.originalAlpha,
				delay : 0.1
			}).to(s.blockLayer, 0.2, {
				alpha : 0.1,
				delay : 0.1
			}).to(s.blockLayer, 0.2, {
				alpha : s.blockLayer.originalAlpha,
				delay : 0.1
			}).to(s.blockLayer, 0.2, {
				alpha : 0.1,
				delay : 0.1
			}).to(s.blockLayer, 0.2, {
				alpha : s.blockLayer.originalAlpha,
				delay : 0.1
			}).to(s.blockLayer, 0.2, {
				alpha : 0.1,
				delay : 0.1
			}).to(s.blockLayer, 0.2, {
				alpha : s.blockLayer.originalAlpha,
				delay : 0.1
			}).to(s.blockLayer, 0.2, {
				alpha : 0,
				delay : 0.1,
				onComplete : function (obj) {
					obj.visible = false;

					if (obj.parent) {
						obj.parent.waitingMode = BlockArray.WAITING_MODE_SHOW;
						obj.parent.stopLoop = false;
					}
				}
			});
		} else if (s.waitingMode == BlockArray.WAITING_MODE_SHOW) {
			s.blockLayer.alpha = 1;
			s.blockLayer.visible = true;
			s.waitingMode = BlockArray.WAITING_MODE_REMOVE;
		} else if (s.waitingMode == BlockArray.WAITING_MODE_REMOVE) {
			LTweenLite.to(s.blockLayer, 1, {
				alpha : 0,
				onStart : function (obj) {
					if (obj.parent) {
						obj.parent.stopLoop = true;
					}
				},
				onComplete : function (obj) {
					obj.removeAllChild();
					obj.alpha = 1;

					if (obj.parent) {
						obj.parent.waitingMode = BlockArray.WAITING_MODE_ADD;
						obj.parent.alpha = obj.parent.originalAlpha;
						obj.parent.stopLoop = false;
					}
				}
			});
		}
	}
};
BlockArray.prototype.addBlocks = function (index) {
	var s = this;

	var setBlockRandomPosition = function (block, width, height) {
		var rx = 0, ry = 0, m = 50;

		if (s.parent.parent) {
			rx = m + Math.random() * (s.parent.parent.getWidth() - m - width);
			ry = m + Math.random() * (s.parent.parent.getHeight() - m - height);

			block.x = rx >> 0;
			block.y = ry >> 0;

			for (var i = 0; i < s.blockLayer.childList.length; i++) {
				var o = s.blockLayer.childList[i];

				if (o.hitTestObject(block) || s.hitFoodTest(block)) {
					setBlockRandomPosition(block, block.getWidth(), block.getHeight());
					break;
				}
			}
		}
	};

	for (var i = 0; i < index; i++) {
		var bitmapData = s.bitmapDataList[Math.round(Math.random() * (s.bitmapDataList.length - 1))];
		var bitmap = new LBitmap(bitmapData);
		var block = new LSprite();
		block.addChild(bitmap);
		setBlockRandomPosition(block, block.getWidth(), block.getHeight());
		s.blockLayer.addChild(block);
	}
};
BlockArray.prototype.hitFoodTest = function (block, foodData) {
	var s = this;

	if (!foodData) {
		if (s.parent && s.parent.parent) {
			var foodObj = s.parent.parent.foodLayer.getChildAt(0);

			if (foodObj) {
				return (!foodObj.isBeEaten && foodObj.hitTestObject(block));
			}
		}
	} else {
		var bcx = 0,
		bcy = 0,
		fcx = foodData.x + foodData.width / 2,
		fcy = foodData.y + foodData.height / 2;

		for (var k = 0, l = s.blockLayer.childList.length; k < l; k++) {
			var o = s.blockLayer.childList[k];

			bcx = o.x + o.getWidth() / 2, bcy = o.y + o.getHeight() / 2;

			if (	
				(Math.abs(bcx - fcx) <= (o.getWidth() + foodData.width) / 2)
				&&
				(Math.abs(bcy - fcy) <= (o.getHeight() + foodData.height) / 2)
			) {
				return true;
			}
		}

		return false;
	}
};