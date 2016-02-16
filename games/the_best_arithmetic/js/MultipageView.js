function MultipageView (w, h) {
	var s = this;
	LExtends(s, LSprite, []);
	
	s.w = w;
	s.h = h;
	
	var mask = new LShape();
	mask.graphics.drawRect(0, "", [0, 0, w, h]);
	
	s.pagesLayer = new LSprite();
	s.pagesLayer.originalX = 0;
	s.pagesLayer.mask = mask;
	s.addChild(s.pagesLayer);
	
	s.pageSelector = new LSprite();
	s.pageSelector.y = h;
	s.addChild(s.pageSelector);
	
	s.currentPage = null;
	s.isMouseDownOnPagesLayer = false;
	s.mousePosX = null;
	s.isLock = false;
	
	s.pagesLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
		s.isMouseDownOnPagesLayer = true;
		
		s.mousePosX = e.offsetX;
	});
	
	s.pagesLayer.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
		s.isMouseDownOnPagesLayer = false;
		s.isLock = false;
		
		var nx = s.pagesLayer.x, ox = s.pagesLayer.originalX;
				      
		if (Math.abs(nx - ox) < 50) {
			s.restorePage();
		} else {
			var toIndex = (s.currentPage ? s.currentPage.index : 0);
						
			if (nx < ox) {
				toIndex++;
			} else {
				toIndex--;
			}
			
			if (toIndex >= 0 && toIndex < s.pagesLayer.numChildren) {
				s.showPage(toIndex);
			} else {
				s.restorePage();
			}
		}
		
		s.mousePosX = null;
	});
	
	s.pagesLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
		if (!s.isMouseDownOnPagesLayer || !s.mousePosX) {
			return;
		}
		
		s.isLock = true;
		
		s.pagesLayer.x += e.offsetX - s.mousePosX;
		s.mousePosX = e.offsetX;
	});
	
}

MultipageView.EVENT_MOUSE_UP_ON_PAGE = "event_up_on_page";

MultipageView.prototype.restorePage = function () {
	var s = this;
	
	LTweenLite.to(s.pagesLayer, 0.5, {
		x : s.pagesLayer.originalX
	});
};

MultipageView.prototype.newPage = function () {
	var s = this, numChildren = s.pagesLayer.numChildren;
	
	var newPage = new LSprite();
	newPage.index = numChildren;
	newPage.x = s.w * numChildren;
	s.pagesLayer.addChild(newPage);
	
	newPage.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
		if (s.isLock) {
			return;
		}
		
		var event = new LEvent(MultipageView.EVENT_MOUSE_UP_ON_PAGE);
		event.target = e.target;
		s.dispatchEvent(event);
		
		delete s.clickTarget;
	});
	
	s.currentPage = newPage;
	
	s.pagesLayer.shapes = [];
	s.pagesLayer.addShape(LShape.RECT, [0, 0, s.pagesLayer.numChildren * s.w, s.h]);
	
	s.addPageSelector(newPage);
};

MultipageView.prototype.addPageSelector = function (p) {
	var s = this;
	
	var selector = new LSprite();
	selector.x = s.pageSelector.getWidth() + 30;
	s.pageSelector.addChild(selector);
	
	p.relatedSelector = selector;
};

MultipageView.prototype.showPage = function (i) {
	var s = this, p = s.pagesLayer.getChildAt(i), toX = -(p.index * s.w);
	
	if (s.isLock) {
		return;
	}
	
	s.currentPage = p;
	
	s.selectSelector(p.relatedSelector);
	
	LTweenLite.to(s.pagesLayer, 0.5, {
		x : toX,
		ease : LEasing.Expo.easeOut,
		onStart : function () {
			s.isLock = true;
		},
		onComplete : function () {
			s.pagesLayer.originalX = toX;
			
			s.isLock = false;
		}
	});
};

MultipageView.prototype.selectSelector = function (selector) {
	var s = this, w = 20, h = 5, lw = 2;
	
	for (var i = 0; i < s.pageSelector.numChildren; i++) {
		var c = s.pageSelector.getChildAt(i);
		
		if (c.objectIndex == selector.objectIndex) {
			c.graphics.clear();
			c.graphics.drawRect(lw, "#54D9EF", [0, 0, w, h], true, "#54D9EF");
		} else {
			c.graphics.clear();
			c.graphics.drawRect(lw, "#87E22E", [0, 0, w, h], true, "#87E22E");
		}
	}
	
	s.pageSelector.x = (s.w - s.pageSelector.getWidth() - 30) / 2;
};

MultipageView.prototype.addIntoCurrentPage = function (o) {
	var s = this;
	
	if (s.currentPage) {
		s.currentPage.addChild(o);
	}
};